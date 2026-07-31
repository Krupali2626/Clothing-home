const Coupon = require("../model/coupon.model");

// ─── Helpers ──────────────────────────────────────────────────────────────────

const calcDiscount = (coupon, subtotal) => {
  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = (subtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  } else {
    discount = coupon.discountValue;
  }
  return Math.min(discount, subtotal); // never exceed subtotal
};

// ─── Public ───────────────────────────────────────────────────────────────────

// @desc    Validate & preview a coupon (called from checkout)
// @route   POST /api/coupons/validate
exports.validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }
    if (!subtotal || Number(subtotal) <= 0) {
      return res.status(400).json({ success: false, message: "Subtotal is required" });
    }

    const coupon = await Coupon.findOne({ code: code.trim().toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Invalid coupon code" });
    }
    if (!coupon.isActive) {
      return res.status(400).json({ success: false, message: "This coupon is no longer active" });
    }

    const now = new Date();
    if (coupon.validFrom && now < coupon.validFrom) {
      return res.status(400).json({ success: false, message: "This coupon is not valid yet" });
    }
    if (coupon.validUntil && now > coupon.validUntil) {
      return res.status(400).json({ success: false, message: "This coupon has expired" });
    }
    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
    }
    if (Number(subtotal) < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrderAmount.toLocaleString("en-IN")} required for this coupon`,
      });
    }

    // Per-user limit check (only if user is authenticated)
    if (req.user) {
      const userUsage = coupon.usedBy.filter(
        (u) => u.user.toString() === req.user._id.toString()
      ).length;
      if (userUsage >= coupon.perUserLimit) {
        return res.status(400).json({
          success: false,
          message: `You have already used this coupon ${coupon.perUserLimit > 1 ? coupon.perUserLimit + " times" : ""}`,
        });
      }
    }

    const discount = calcDiscount(coupon, Number(subtotal));

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscountAmount: coupon.maxDiscountAmount,
        applicableFor: coupon.applicableFor,
      },
      discount: Math.round(discount),
      finalAmount: Math.round(Number(subtotal) - discount),
      message:
        coupon.discountType === "percentage"
          ? `${coupon.discountValue}% off applied${coupon.maxDiscountAmount ? ` (max ₹${coupon.maxDiscountAmount})` : ""}`
          : `₹${coupon.discountValue} off applied`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all public coupons with eligibility info (called from checkout page)
// @route   GET /api/coupons/public
exports.getPublicCoupons = async (req, res) => {
  try {
    const subtotal = Number(req.query.subtotal) || 0;

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    const now = new Date();

    const result = coupons.map((c) => {
      // Compute discount preview
      let discountPreview = 0;
      if (c.discountType === "percentage") {
        discountPreview = Math.round((subtotal * c.discountValue) / 100);
        if (c.maxDiscountAmount) discountPreview = Math.min(discountPreview, c.maxDiscountAmount);
      } else {
        discountPreview = c.discountValue;
      }
      discountPreview = Math.min(discountPreview, subtotal);

      // Check eligibility
      let eligible = true;
      let ineligibleReason = "";

      if (!c.isActive) {
        eligible = false;
        ineligibleReason = "Coupon is inactive";
      } else if (c.validFrom && now < c.validFrom) {
        eligible = false;
        ineligibleReason = `Valid from ${new Date(c.validFrom).toLocaleDateString("en-IN")}`;
      } else if (c.validUntil && now > c.validUntil) {
        eligible = false;
        ineligibleReason = "Coupon has expired";
      } else if (c.usageLimit !== null && c.usedCount >= c.usageLimit) {
        eligible = false;
        ineligibleReason = "Usage limit reached";
      } else if (subtotal > 0 && subtotal < c.minOrderAmount) {
        eligible = false;
        ineligibleReason = `Add ₹${(c.minOrderAmount - subtotal).toLocaleString("en-IN")} more to use this coupon`;
      }

      return {
        _id: c._id,
        code: c.code,
        description: c.description,
        discountType: c.discountType,
        discountValue: c.discountValue,
        maxDiscountAmount: c.maxDiscountAmount,
        minOrderAmount: c.minOrderAmount,
        validUntil: c.validUntil,
        applicableFor: c.applicableFor,
        isActive: c.isActive,
        discountPreview: subtotal > 0 ? discountPreview : null,
        eligible,
        ineligibleReason,
      };
    });

    res.json({ success: true, coupons: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin ────────────────────────────────────────────────────────────────────

// @desc    Get all coupons (admin)
// @route   GET /api/coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, count: coupons.length, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single coupon (admin)
// @route   GET /api/coupons/:id
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create coupon (admin)
// @route   POST /api/coupons
exports.createCoupon = async (req, res) => {
  try {
    const {
      code, description, discountType, discountValue,
      minOrderAmount, maxDiscountAmount, usageLimit,
      perUserLimit, validFrom, validUntil, isActive, applicableFor,
    } = req.body;

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      perUserLimit: Number(perUserLimit) || 1,
      validFrom: validFrom || new Date(),
      validUntil: validUntil || null,
      isActive: isActive !== undefined ? isActive : true,
      applicableFor: applicableFor || "all",
    });

    res.status(201).json({ success: true, coupon });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Coupon code already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update coupon (admin)
// @route   PUT /api/coupons/:id
exports.updateCoupon = async (req, res) => {
  try {
    const updates = { ...req.body };
    // Always uppercase the code if provided
    if (updates.code) updates.code = updates.code.trim().toUpperCase();
    if (updates.maxDiscountAmount === "" || updates.maxDiscountAmount === 0)
      updates.maxDiscountAmount = null;
    if (updates.usageLimit === "" || updates.usageLimit === 0)
      updates.usageLimit = null;
    if (updates.validUntil === "") updates.validUntil = null;

    const coupon = await Coupon.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, coupon });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Coupon code already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete coupon (admin)
// @route   DELETE /api/coupons/:id
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle active status (admin)
// @route   PUT /api/coupons/:id/toggle
exports.toggleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    res.json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
