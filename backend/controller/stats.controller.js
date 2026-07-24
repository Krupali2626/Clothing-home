const { User, Product, Order, Category } = require("../model");

// @desc    Get dashboard stats (admin)
// @route   GET /api/stats
exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const [
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      revenueResult,
      thisMonthOrders,
      lastMonthOrders,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthProducts,
      lastMonthProducts,
      thisMonthRevenue,
      lastMonthRevenue,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $in: ["delivered", "shipped", "processing"] } } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
      Order.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      Order.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      User.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      User.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Product.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      Product.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfThisMonth },
            status: { $in: ["delivered", "shipped", "processing"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
            status: { $in: ["delivered", "shipped", "processing"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const thisRev = thisMonthRevenue[0]?.total || 0;
    const lastRev = lastMonthRevenue[0]?.total || 0;

    const pctChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const revenueChange = pctChange(thisRev, lastRev);
    const ordersChange = pctChange(thisMonthOrders, lastMonthOrders);
    const productsChange = pctChange(thisMonthProducts, lastMonthProducts);
    const usersChange = pctChange(thisMonthUsers, lastMonthUsers);

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedOrders = recentOrders.map((order) => ({
      _id: order._id,
      id: order.orderNumber,
      orderNumber: order.orderNumber,
      customer: order.user?.name || "Unknown",
      email: order.user?.email || "",
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      total: order.totalPrice || 0,
      status: order.status || "pending",
      items: order.items?.length || 0,
    }));

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        totalCategories,
        revenueChange,
        ordersChange,
        productsChange,
        usersChange,
      },
      recentOrders: formattedOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
