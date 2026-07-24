const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const orderRoute = require("./order.route");        
const advertisementRoute = require("./advertisement.route");
const statsController = require("../controller/stats.controller");
const settingsController = require("../controller/settings.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const User = require("../model/user.model");
const Category = require("../model/category.model");
const Product = require("../model/product.model");
const Order = require("../model/order.model");
const Advertisement = require("../model/advertisement.model");

// Routes
router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/advertisements", advertisementRoute);

// Stats (admin)
router.get("/stats", protect, admin, statsController.getStats);

// Store settings
router.get("/settings", protect, admin, settingsController.getSettings);
router.put("/settings", protect, admin, settingsController.updateSettings);

// Seed endpoint (development only)
router.post("/seed", async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Advertisement.deleteMany({});

    // Create sample users
    const users = [
      {
        name: "Admin User",
        email: "admin@dstore.com",
        password: "admin123",
        phone: "9876543210",
        role: "admin",
        status: "active",
        avatar: "https://i.pravatar.cc/150?img=1",
        addresses: [
          {
            label: "Home",
            fullName: "Admin User",
            phone: "9876543210",
            street: "123 Admin Street",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            isDefault: true,
          },
        ],
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "8765432109",
        role: "customer",
        status: "active",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        phone: "7654321098",
        role: "customer",
        status: "active",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ];

    const createdUsers = await User.insertMany(users);

    // Create sample categories
    const categories = [
      {
        name: "T-Shirts",
        slug: "t-shirts",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        description: "Comfortable and stylish t-shirts",
        count: 0,
      },
      {
        name: "Shirts",
        slug: "shirts",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1598033129519-32be63a36dba?w=300&h=300&fit=crop",
        description: "Formal and casual shirts",
        count: 0,
      },
      {
        name: "Jeans",
        slug: "jeans",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop",
        description: "Durable jeans",
        count: 0,
      },
      {
        name: "Dresses",
        slug: "dresses",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1595777712802-2b23f3b1f50f?w=300&h=300&fit=crop",
        description: "Elegant dresses",
        count: 0,
      },
      {
        name: "Shorts",
        slug: "shorts",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop",
        description: "Summer shorts",
        count: 0,
      },
      {
        name: "Jackets",
        slug: "jackets",
        type: "clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop",
        description: "Stylish jackets",
        count: 0,
      },
      {
        name: "Kitchen Appliances",
        slug: "kitchen-appliances",
        type: "appliance",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop",
        description: "Modern kitchen appliances",
        count: 0,
      },
      {
        name: "Washing Machines",
        slug: "washing-machines",
        type: "appliance",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
        description: "Washing machines",
        count: 0,
      },
      {
        name: "Refrigerators",
        slug: "refrigerators",
        type: "appliance",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop",
        description: "Refrigerators",
        count: 0,
      },
      {
        name: "Air Conditioners",
        slug: "air-conditioners",
        type: "appliance",
        image: "https://images.unsplash.com/photo-1585519504555-8accf3b0b62e?w=300&h=300&fit=crop",
        description: "Air conditioners",
        count: 0,
      },
    ];

    const createdCategories = await Category.insertMany(categories);

    // Create sample products
    const products = [
      {
        name: "Classic Blue T-Shirt",
        slug: "classic-blue-tshirt",
        description: "Premium cotton blue t-shirt",
        category: createdCategories[0]._id,
        type: "clothing",
        brand: "D-Brand",
        price: 599,
        discountPrice: 399,
        stock: 50,
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"],
        colors: ["Blue", "Black", "White"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        numReviews: 24,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
      {
        name: "White Graphic T-Shirt",
        slug: "white-graphic-tshirt",
        description: "Stylish white t-shirt with trendy print",
        category: createdCategories[0]._id,
        type: "clothing",
        brand: "StyleMax",
        price: 699,
        discountPrice: 499,
        stock: 35,
        images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb50c5?w=600"],
        colors: ["White", "Black"],
        sizes: ["M", "L", "XL"],
        rating: 4.2,
        numReviews: 18,
        featured: true,
      },
      {
        name: "Formal White Shirt",
        slug: "formal-white-shirt",
        description: "Professional formal shirt",
        category: createdCategories[1]._id,
        type: "clothing",
        brand: "FormalWear Co",
        price: 1299,
        discountPrice: 899,
        stock: 28,
        images: ["https://images.unsplash.com/photo-1598033129519-32be63a36dba?w=600"],
        colors: ["White", "Light Blue"],
        sizes: ["M", "L", "XL"],
        rating: 4.6,
        numReviews: 42,
        featured: true,
        bestSeller: true,
      },
      {
        name: "Slim Fit Blue Jeans",
        slug: "slim-fit-blue-jeans",
        description: "Modern slim fit jeans with stretch",
        category: createdCategories[2]._id,
        type: "clothing",
        brand: "DenimPro",
        price: 1499,
        discountPrice: 999,
        stock: 55,
        images: ["https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600"],
        colors: ["Blue", "Black"],
        sizes: ["30", "32", "34"],
        rating: 4.8,
        numReviews: 67,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
      {
        name: "Elegant Black Evening Dress",
        slug: "elegant-black-dress",
        description: "Sophisticated evening dress",
        category: createdCategories[3]._id,
        type: "clothing",
        brand: "ElegantWear",
        price: 2499,
        discountPrice: 1699,
        stock: 15,
        images: ["https://images.unsplash.com/photo-1595777712802-2b23f3b1f50f?w=600"],
        colors: ["Black"],
        sizes: ["S", "M", "L"],
        rating: 4.9,
        numReviews: 23,
        featured: true,
        bestSeller: true,
      },
      {
        name: "Stainless Steel Blender",
        slug: "stainless-steel-blender",
        description: "Powerful blender with multiple speeds",
        category: createdCategories[6]._id,
        type: "appliance",
        brand: "KitchenPro",
        price: 3499,
        discountPrice: 2299,
        stock: 22,
        images: ["https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600"],
        colors: ["Silver"],
        sizes: ["1.5L"],
        rating: 4.6,
        numReviews: 44,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
      {
        name: "Electric Kettle",
        slug: "electric-kettle",
        description: "Fast-boiling electric kettle",
        category: createdCategories[6]._id,
        type: "appliance",
        brand: "QuickHeat",
        price: 1299,
        discountPrice: 799,
        stock: 60,
        images: ["https://images.unsplash.com/photo-1586521221914-3f3257df643d?w=600"],
        colors: ["Black", "White"],
        sizes: ["1.8L"],
        rating: 4.7,
        numReviews: 78,
        featured: true,
        bestSeller: true,
      },
      {
        name: "Fully Automatic Washing Machine",
        slug: "fully-auto-washing-machine",
        description: "Advanced washing machine",
        category: createdCategories[7]._id,
        type: "appliance",
        brand: "LaundryMax",
        price: 24999,
        discountPrice: 18999,
        stock: 10,
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"],
        colors: ["White", "Silver"],
        sizes: ["7kg"],
        rating: 4.8,
        numReviews: 56,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
      {
        name: "Double Door Refrigerator",
        slug: "double-door-refrigerator",
        description: "Spacious refrigerator",
        category: createdCategories[8]._id,
        type: "appliance",
        brand: "CoolTech",
        price: 34999,
        discountPrice: 26999,
        stock: 8,
        images: ["https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600"],
        colors: ["Silver", "Black"],
        sizes: ["500L"],
        rating: 4.7,
        numReviews: 42,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
      {
        name: "Split AC 1.5 Ton",
        slug: "split-ac-1-5-ton",
        description: "Energy-efficient split AC",
        category: createdCategories[9]._id,
        type: "appliance",
        brand: "CoolBreeze",
        price: 29999,
        discountPrice: 22999,
        stock: 12,
        images: ["https://images.unsplash.com/photo-1585519504555-8accf3b0b62e?w=600"],
        colors: ["White"],
        sizes: ["1.5 Ton"],
        rating: 4.6,
        numReviews: 39,
        featured: true,
        bestSeller: true,
        flashSale: true,
      },
    ];

    await Product.insertMany(products);

    const ads = [
      {
        title: "Mega Fashion Sale",
        subtitle: "Up to 60% off on trending clothing",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
        link: "/clothing",
        position: "hero",
        type: "clothing",
        priority: 10,
        status: "active",
      },
      {
        title: "Home Appliances Fest",
        subtitle: "Best deals on kitchen & cooling appliances",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
        link: "/appliances",
        position: "top-banner",
        type: "appliance",
        priority: 8,
        status: "active",
      },
      {
        title: "New Arrivals",
        subtitle: "Fresh styles just dropped",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop",
        link: "/clothing",
        position: "in-feed",
        type: "clothing",
        priority: 5,
        status: "active",
      },
    ];
    const createdAds = await Advertisement.insertMany(ads);

    res.json({
      success: true,
      message: "✅ Database seeded successfully!",
      data: {
        users: createdUsers.length,
        categories: createdCategories.length,
        products: products.length,
        advertisements: createdAds.length,
        credentials: [
          { email: "admin@dstore.com", password: "admin123", role: "admin" },
          { email: "john@example.com", password: "password123", role: "customer" },
          { email: "jane@example.com", password: "password123", role: "customer" },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error seeding database: " + error.message,
    });
  }
});

module.exports = router;
