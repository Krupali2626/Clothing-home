const { Advertisement } = require("../model");

// @desc    Get active advertisements (public) - optionally by position/type
// @route   GET /api/advertisements
exports.getAdvertisements = async (req, res) => {
  try {
    const { position, type } = req.query;
    const filter = { status: "active" };
    if (position) filter.position = position;
    if (type) filter.type = type;

    const now = new Date();
    const ads = await Advertisement.find({
      ...filter,
      $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }],
    }).sort({ priority: -1, createdAt: -1 });

    res.json({ success: true, count: ads.length, advertisements: ads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all advertisements (admin)
// @route   GET /api/advertisements/all
exports.getAllAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json({ success: true, count: ads.length, advertisements: ads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single advertisement
// @route   GET /api/advertisements/:id
exports.getAdvertisementById = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found" });
    res.json({ success: true, advertisement: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create advertisement (admin)
// @route   POST /api/advertisements
exports.createAdvertisement = async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.user) body.createdBy = req.user._id;
    const ad = await Advertisement.create(body);
    res.status(201).json({ success: true, advertisement: ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update advertisement (admin)
// @route   PUT /api/advertisements/:id
exports.updateAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found" });
    res.json({ success: true, advertisement: ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete advertisement (admin)
// @route   DELETE /api/advertisements/:id
exports.deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Advertisement not found" });
    res.json({ success: true, message: "Advertisement deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
