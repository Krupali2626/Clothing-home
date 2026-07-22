const { Product, Category } = require("../model");
const { toProductObject } = require("../utils/transform");
const mongoose = require("mongoose");

// Helper: build slug from name
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Resolve a `category` query value into a mongo filter.
// Accepts: a Category ObjectId, a category slug, or a product type.
const resolveCategoryFilter = async (value) => {
  if (!value) return {};
  if (mongoose.isValidObjectId(value)) return { category: value };
  const bySlug = await Category.findOne({ slug: value });
  if (bySlug) return { category: bySlug._id };
  // Fallback: treat as a product type (clothing / appliance)
  return { type: value };
};

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
      gender,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (featured === "true") filter.featured = true;
    if (bestSeller === "true") filter.bestSeller = true;
    if (flashSale === "true") filter.flashSale = true;
    if (search) filter.$text = { $search: search };
    if (gender) filter.gender = gender;

    if (category) {
      Object.assign(filter, await resolveCategoryFilter(category));
    }

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
      products: products.map((p) => toProductObject(p)),
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
    res.json({ success: true, product: toProductObject(product) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Resolve a `category` value into a real ObjectId.
// Accepts: a Category ObjectId, a category slug, or a category name.
const resolveCategoryId = async (value) => {
  if (!value) return undefined;
  if (mongoose.isValidObjectId(value)) return value;
  const bySlug = await Category.findOne({ slug: value });
  if (bySlug) return bySlug._id;
  const byName = await Category.findOne({ name: new RegExp("^" + value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i") });
  return byName?._id;
};

// @desc    Create product (admin)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = slugify(body.name) + "-" + Date.now().toString().slice(-4);
    if (body.category) {
      const resolved = await resolveCategoryId(body.category);
      if (!resolved) return res.status(400).json({ success: false, message: "Invalid category" });
      body.category = resolved;
    }
    const product = await Product.create(body);
    // update category count
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $inc: { count: 1 } });
    }
    res.status(201).json({ success: true, product: toProductObject(product) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product (admin)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.category) {
      const resolved = await resolveCategoryId(updates.category);
      if (!resolved) return res.status(400).json({ success: false, message: "Invalid category" });
      updates.category = resolved;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, product: toProductObject(product) });
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
    res.status(201).json({ success: true, product: toProductObject(product) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
