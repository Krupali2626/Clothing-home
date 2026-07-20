const { Product, Category } = require("../model");

// Helper: build slug from name
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// @desc    Get all products (with filters, search, pagination)
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const {
      type,
      category,
      search,
      featured,
      bestSeller,
      flashSale,
      status,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured === "true") filter.featured = true;
    if (bestSeller === "true") filter.bestSeller = true;
    if (flashSale === "true") filter.flashSale = true;
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name slug");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product (admin)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = slugify(body.name) + "-" + Date.now().toString().slice(-4);
    const product = await Product.create(body);
    // update category count
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $inc: { count: 1 } });
    }
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product (admin)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (admin)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $inc: { count: -1 } });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const review = {
      user: req.user ? req.user._id : null,
      name: req.user ? req.user.name : "Guest",
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
