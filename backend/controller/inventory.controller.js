const { Product, StockMovement } = require("../model");

const asPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

// GET /api/inventory/summary
exports.getSummary = async (req, res) => {
  try {
    const products = await Product.find({}, "name stock lowStockThreshold status").lean();
    const active = products.filter((product) => product.status === "active");
    const outOfStock = active.filter((product) => product.stock === 0).length;
    const lowStock = active.filter((product) => product.stock > 0 && product.stock <= product.lowStockThreshold).length;
    res.json({ success: true, summary: { totalProducts: active.length, totalUnits: active.reduce((sum, p) => sum + p.stock, 0), lowStock, outOfStock } });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// GET /api/inventory/products?status=all|low|out
exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find({}, "name sku stock lowStockThreshold status category images brand")
      .populate("category", "name")
      .sort({ stock: 1, name: 1 })
      .lean();
    const status = req.query.status || "all";
    const filtered = products.filter((p) => status === "out" ? p.stock === 0 : status === "low" ? p.stock > 0 && p.stock <= p.lowStockThreshold : true);
    res.json({ success: true, count: filtered.length, products: filtered });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// POST /api/inventory/products/:id/adjust
exports.adjustStock = async (req, res) => {
  try {
    const { operation, quantity, reason = "", reference = "" } = req.body;
    const isSetOperation = operation === "set";
    const isValidQuantity = isSetOperation
      ? Number.isInteger(Number(quantity)) && Number(quantity) >= 0
      : asPositiveInteger(quantity);
    if (!["in", "out", "adjustment", "set"].includes(operation) || !isValidQuantity) {
      return res.status(400).json({ success: false, message: "Enter a valid whole-number stock quantity" });
    }
    const amount = Number(quantity);
    if (isSetOperation) {
      // `new: false` returns the pre-update document for an accurate audit log.
      const previousProduct = await Product.findByIdAndUpdate(req.params.id, { $set: { stock: amount } }, { new: false });
      if (!previousProduct) return res.status(404).json({ success: false, message: "Product not found" });
      const product = await Product.findById(req.params.id);
      await StockMovement.create({ product: product._id, type: "adjustment", quantity: amount - previousProduct.stock, previousStock: previousProduct.stock, resultingStock: product.stock, reason, reference, performedBy: req.user._id });
      return res.json({ success: true, product, message: "Stock set successfully" });
    }
    const delta = operation === "out" ? -amount : amount;
    const filter = { _id: req.params.id };
    if (delta < 0) filter.stock = { $gte: amount };
    const product = await Product.findOneAndUpdate(filter, { $inc: { stock: delta } }, { new: true });
    if (!product) return res.status(400).json({ success: false, message: "Product was not found or has insufficient stock" });
    const previousStock = product.stock - delta;
    const movement = await StockMovement.create({ product: product._id, type: operation, quantity: delta, previousStock, resultingStock: product.stock, reason, reference, performedBy: req.user._id });
    res.json({ success: true, product, movement });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// GET /api/inventory/products/:id/movements
exports.getMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find({ product: req.params.id }).populate("performedBy", "name email").sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, movements });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
