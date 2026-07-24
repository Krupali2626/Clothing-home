const { Settings } = require("../model");

const DEFAULT_SETTINGS = {
  storeName: "D.Store",
  storeEmail: "info@store.com",
  storePhone: "+91 12345 67890",
  emailNotifications: true,
  smsNotifications: false,
  orderAlerts: true,
};

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(DEFAULT_SETTINGS);
  }
  return settings;
};

// @desc    Get store settings
// @route   GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update store settings (admin)
// @route   PUT /api/settings
exports.updateSettings = async (req, res) => {
  try {
    const allowed = [
      "storeName",
      "storeEmail",
      "storePhone",
      "emailNotifications",
      "smsNotifications",
      "orderAlerts",
    ];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const settings = await getOrCreateSettings();
    Object.assign(settings, updates);
    await settings.save();

    res.json({ success: true, settings, message: "Settings saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
