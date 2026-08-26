const { Order, Product, StockMovement, Coupon } = require("../model");

const STATUS_FLOW = ["pending", "processing", "shipped", "delivered", "cancelled"];

const calculateCouponDiscount = (coupon, subtotal) => {
  const discount =
    coupon.discountType === "percentage"
      ? (subtotal * coupon.discountValue) / 100
      : coupon.discountValue;
  const cappedDiscount = coupon.maxDiscountAmount
    ? Math.min(discount, coupon.maxDiscountAmount)
    : discount;
  return Math.round(Math.min(cappedDiscount, subtotal));
};

const normalizeStatus = (status) => {
  if (!status) return null;
  return String(status).trim().toLowerCase();
};

const pushStatusHistory = (order, status, note = "") => {
  if (!order.statusHistory) order.statusHistory = [];
  order.statusHistory.push({ status, note, at: new Date() });
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  let reservedCoupon = null;
  let reservedCouponUsageAt = null;
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }

    let itemsPrice = 0;
    const orderItems = [];
    const stockUpdates = [];
    const productsForOrder = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `${product.name} out of stock` });
      }

      const price = product.discountPrice || product.price;
      itemsPrice += price * item.quantity;
      productsForOrder.push({ item, product });
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || "",
        price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    const normalizedCouponCode = couponCode?.trim().toUpperCase();
    let discount = 0;
    if (normalizedCouponCode) {
      const coupon = await Coupon.findOne({ code: normalizedCouponCode });
      const now = new Date();
      if (!coupon || !coupon.isActive) {
        return res.status(400).json({ success: false, message: "This coupon is no longer active" });
      }
      if (coupon.validFrom && now < coupon.validFrom) {
        return res.status(400).json({ success: false, message: "This coupon is not valid yet" });
      }
      if (coupon.validUntil && now >= coupon.validUntil) {
        return res.status(400).json({ success: false, message: "This coupon has expired" });
      }
      if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
      }
      if (itemsPrice < coupon.minOrderAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount of ₹${coupon.minOrderAmount.toLocaleString("en-IN")} required for this coupon`,
        });
      }
      const userUsage = coupon.usedBy.filter(
        (usage) => usage.user.toString() === req.user._id.toString()
      ).length;
      if (userUsage >= coupon.perUserLimit) {
        return res.status(400).json({ success: false, message: "You have reached this coupon's usage limit" });
      }

      reservedCoupon = await Coupon.findOneAndUpdate(
        {
          _id: coupon._id,
          isActive: true,
          $and: [
            { $or: [{ validUntil: null }, { validUntil: { $gt: now } }] },
            {
              $or: [
                { usageLimit: null },
                { $expr: { $lt: ["$usedCount", "$usageLimit"] } },
              ],
            },
            {
              $expr: {
                $lt: [
                  {
                    $size: {
                      $filter: {
                        input: "$usedBy",
                        as: "usage",
                        cond: { $eq: ["$$usage.user", req.user._id] },
                      },
                    },
                  },
                  "$perUserLimit",
                ],
              },
            },
          ],
        },
        {
          $inc: { usedCount: 1 },
          $push: { usedBy: { user: req.user._id, usedAt: now } },
        },
        { new: true }
      );
      if (!reservedCoupon) {
        return res.status(409).json({ success: false, message: "Coupon usage limit reached. Please try another coupon." });
      }
      reservedCouponUsageAt = now;
      discount = calculateCouponDiscount(coupon, itemsPrice);
    }

    for (const { item, product } of productsForOrder) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
      if (!updatedProduct) {
        const stockError = new Error(`${product.name} no longer has enough stock`);
        stockError.status = 400;
        throw stockError;
      }

      stockUpdates.push({
        product: product._id,
        quantity: -item.quantity,
        previousStock: updatedProduct.stock + item.quantity,
        resultingStock: updatedProduct.stock,
        reason: "Order placed",
      });
    }

    const shippingPrice = itemsPrice > 999 ? 0 : 49;
    const totalPrice = itemsPrice + shippingPrice - discount;

    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      couponCode: normalizedCouponCode,
      couponDiscount: discount,
    });

    await Promise.all(
      stockUpdates.map((entry) =>
        StockMovement.create({
          product: entry.product,
          type: "sale",
          quantity: entry.quantity,
          previousStock: entry.previousStock,
          resultingStock: entry.resultingStock,
          reason: entry.reason,
          reference: order._id.toString(),
          performedBy: req.user ? req.user._id : undefined,
        })
      )
    );

    res.status(201).json({ success: true, order });
  } catch (error) {
    if (reservedCoupon) {
      await Coupon.findByIdAndUpdate(reservedCoupon._id, {
        $inc: { usedCount: -1 },
        $pull: { usedBy: { user: req.user._id, usedAt: reservedCouponUsageAt } },
      });
    }
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = normalizeStatus(status);
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const isOwner = order.user && order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized to view this order" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const nextStatus = normalizeStatus(req.body.status);
    if (nextStatus) {
      if (!STATUS_FLOW.includes(nextStatus)) {
        return res.status(400).json({ success: false, message: "Invalid order status" });
      }
      if (order.status !== nextStatus) {
        order.status = nextStatus;
        pushStatusHistory(order, nextStatus, req.body.note || `Status updated to ${nextStatus}`);
        if (nextStatus === "delivered") {
          order.deliveredAt = new Date();
          order.paymentStatus = order.paymentMethod === "cod" ? "paid" : order.paymentStatus;
        }
        if (nextStatus === "cancelled" && order.paymentStatus === "paid") {
          order.paymentStatus = "refunded";
        }
      }
    }

    if (req.body.paymentStatus) {
      order.paymentStatus = normalizeStatus(req.body.paymentStatus);
    }
    if (req.body.estimatedDelivery) {
      order.estimatedDelivery = new Date(req.body.estimatedDelivery);
    }

    await order.save();
    await order.populate("user", "name email");
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Cancel own order (customer) — only pending/processing
// @route   PUT /api/orders/:id/cancel
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const isOwner = order.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }

    if (!["pending", "processing"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Only pending or processing orders can be cancelled",
      });
    }

    // Restock items
    for (const item of order.items) {
      const product = await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } }, { new: true });
      if (product) await StockMovement.create({ product: product._id, type: "return", quantity: item.quantity, previousStock: product.stock - item.quantity, resultingStock: product.stock, reason: "Order cancelled", reference: order._id.toString(), performedBy: req.user._id });
    }

    order.status = "cancelled";
    pushStatusHistory(order, "cancelled", req.body.note || "Cancelled by customer");
    if (order.paymentStatus === "paid") order.paymentStatus = "refunded";
    await order.save();

    res.json({ success: true, order, message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete order (admin)
// @route   DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
