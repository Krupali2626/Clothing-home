const { Order, Product } = require("../model");

const STATUS_FLOW = ["pending", "processing", "shipped", "delivered", "cancelled"];

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
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }

    let itemsPrice = 0;
    const orderItems = [];

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
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || "",
        price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
      product.stock -= item.quantity;
      await product.save();
    }

    const shippingPrice = itemsPrice > 999 ? 0 : 49;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
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
