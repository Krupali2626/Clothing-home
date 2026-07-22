require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Models
const User = require("./model/user.model");
const Category = require("./model/category.model");
const Product = require("./model/product.model");
const Order = require("./model/order.model");
const Advertisement = require("./model/advertisement.model");

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ============ USERS ============
    const users = [
      {
        name: "Admin User",
        email: "admin@dstore.com",
        password: "admin123", // Will be hashed
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
        addresses: [
          {
            label: "Home",
            fullName: "John Doe",
            phone: "8765432109",
            street: "456 Customer Lane",
            city: "Delhi",
            state: "Delhi",
            pincode: "110001",
            isDefault: true,
          },
        ],
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        phone: "7654321098",
        role: "customer",
        status: "active",
        avatar: "https://i.pravatar.cc/150?img=3",
        addresses: [
          {
            label: "Home",
            fullName: "Jane Smith",
            phone: "7654321098",
            street: "789 User Road",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560001",
            isDefault: true,
          },
        ],
      },
    ];

    const usersWithHashedPasswords = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log("✅ Created 3 users");

    // ============ CATEGORIES ============
    const categories = [
      // Clothing categories
      {
        name: "T-Shirts",
        slug: "t-shirts",
        type: "clothing",
        image: "https://picsum.photos/seed/1521572163474-6864f9cf17ab/300/300",
        description: "Comfortable and stylish t-shirts for casual wear",
        count: 0,
        status: "active",
      },
      {
        name: "Shirts",
        slug: "shirts",
        type: "clothing",
        image: "https://picsum.photos/seed/1598033129519-32be63a36dba/300/300",
        description: "Formal and casual shirts for all occasions",
        count: 0,
        status: "active",
      },
      {
        name: "Jeans",
        slug: "jeans",
        type: "clothing",
        image: "https://picsum.photos/seed/1542272604-787c62d465d1/300/300",
        description: "Durable and trendy jeans for everyday wear",
        count: 0,
        status: "active",
      },
      {
        name: "Dresses",
        slug: "dresses",
        type: "clothing",
        image: "https://picsum.photos/seed/1595777712802-2b23f3b1f50f/300/300",
        description: "Elegant dresses for every occasion",
        count: 0,
        status: "active",
      },
      {
        name: "Shorts",
        slug: "shorts",
        type: "clothing",
        image: "https://picsum.photos/seed/1591195853828-11db59a44f6b/300/300",
        description: "Perfect shorts for summer season",
        count: 0,
        status: "active",
      },
      {
        name: "Jackets",
        slug: "jackets",
        type: "clothing",
        image: "https://picsum.photos/seed/1551028719-00167b16ebc5/300/300",
        description: "Stylish jackets for all seasons",
        count: 0,
        status: "active",
      },
      // Appliance categories
      {
        name: "Kitchen Appliances",
        slug: "kitchen-appliances",
        type: "appliance",
        image: "https://picsum.photos/seed/1565299585323-38d6b0865b47/300/300",
        description: "Modern kitchen appliances for convenient cooking",
        count: 0,
        status: "active",
      },
      {
        name: "Washing Machines",
        slug: "washing-machines",
        type: "appliance",
        image: "https://picsum.photos/seed/1558618666-fcd25c85cd64/300/300",
        description: "Efficient washing machines for laundry",
        count: 0,
        status: "active",
      },
      {
        name: "Refrigerators",
        slug: "refrigerators",
        type: "appliance",
        image: "https://picsum.photos/seed/1584568694244-14fbdf83bd30/300/300",
        description: "High-capacity refrigerators for food storage",
        count: 0,
        status: "active",
      },
      {
        name: "Air Conditioners",
        slug: "air-conditioners",
        type: "appliance",
        image: "https://picsum.photos/seed/1585519504555-8accf3b0b62e/300/300",
        description: "Cooling solutions for comfortable living",
        count: 0,
        status: "active",
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log("✅ Created 10 categories");

    // ============ PRODUCTS ============
    const products = [
      // T-Shirts
      {
        name: "Classic Blue T-Shirt",
        slug: "classic-blue-tshirt",
        description: "Premium cotton blue t-shirt perfect for everyday wear",
        category: createdCategories[0]._id, // T-Shirts
        type: "clothing",
        gender: "male",
        brand: "D-Brand",
        price: 599,
        discountPrice: 399,
        stock: 50,
        images: [
          "https://picsum.photos/seed/1521572163474-6864f9cf17ab/600/600",
          "https://picsum.photos/seed/1603252109303-2368c2de2d00/600/600",
        ],
        colors: ["Blue", "Black", "White"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        rating: 4.5,
        numReviews: 24,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "White Graphic T-Shirt",
        slug: "white-graphic-tshirt",
        description: "Stylish white t-shirt with trendy graphic print",
        category: createdCategories[0]._id,
        type: "clothing",
        gender: "female",
        brand: "StyleMax",
        price: 699,
        discountPrice: 499,
        stock: 35,
        images: [
          "https://picsum.photos/seed/1503341455253-b2e723bb50c5/600/600",
        ],
        colors: ["White", "Black"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.2,
        numReviews: 18,
        featured: true,
        bestSeller: false,
        flashSale: false,
        status: "active",
      },
      {
        name: "Cotton Striped T-Shirt",
        slug: "striped-tshirt",
        description: "Comfortable striped t-shirt for casual outings",
        category: createdCategories[0]._id,
        type: "clothing",
        gender: "male",
        brand: "ComfortWear",
        price: 549,
        discountPrice: 349,
        stock: 45,
        images: [
          "https://picsum.photos/seed/1527213989779-5265f46a3fc7/600/600",
        ],
        colors: ["Red", "Blue", "Green"],
        sizes: ["M", "L", "XL"],
        rating: 4.7,
        numReviews: 31,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },

      // Shirts
      {
        name: "Formal White Shirt",
        slug: "formal-white-shirt",
        description: "Professional formal white shirt for office and events",
        category: createdCategories[1]._id, // Shirts
        type: "clothing",
        gender: "male",
        brand: "FormalWear Co",
        price: 1299,
        discountPrice: 899,
        stock: 28,
        images: [
          "https://picsum.photos/seed/1598033129519-32be63a36dba/600/600",
        ],
        colors: ["White", "Light Blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        rating: 4.6,
        numReviews: 42,
        featured: true,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },
      {
        name: "Casual Denim Shirt",
        slug: "casual-denim-shirt",
        description: "Versatile denim shirt suitable for casual and semi-formal occasions",
        category: createdCategories[1]._id,
        type: "clothing",
        gender: "male",
        brand: "DenimClassic",
        price: 999,
        discountPrice: 699,
        stock: 32,
        images: [
          "https://picsum.photos/seed/1616681563769-f8c11c87e77f/600/600",
        ],
        colors: ["Blue", "Black"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.4,
        numReviews: 19,
        featured: false,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },

      // Jeans
      {
        name: "Slim Fit Blue Jeans",
        slug: "slim-fit-blue-jeans",
        description: "Modern slim fit blue jeans with stretch fabric for comfort",
        category: createdCategories[2]._id, // Jeans
        type: "clothing",
        gender: "male",
        brand: "DenimPro",  
        price: 1499,
        discountPrice: 999,
        stock: 55,
        images: [
          "https://picsum.photos/seed/1542272604-787c62d465d1/600/600",
        ],
        colors: ["Blue", "Black", "Grey"],
        sizes: ["28", "30", "32", "34", "36"],
        rating: 4.8,
        numReviews: 67,
        featured: true, 
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "Black Skinny Jeans",
        slug: "black-skinny-jeans",
        description: "Trendy black skinny jeans perfect for a stylish look",
        category: createdCategories[2]._id,
        type: "clothing",
        gender: "female",
        brand: "StyleFit",
        price: 1399,
        discountPrice: 899,
        stock: 40,
        images: [
          "https://picsum.photos/seed/1604695573706-e2f3664b9e48/600/600",
        ],
        colors: ["Black"],
        sizes: ["28", "30", "32", "34"],
        rating: 4.3,
        numReviews: 29,
        featured: false,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },

      // Dresses
      {
        name: "Elegant Black Evening Dress",
        slug: "elegant-black-dress",
        description: "Sophisticated black evening dress for special occasions",
        category: createdCategories[3]._id, // Dresses
        type: "clothing",
        gender: "female",
        brand: "ElegantWear",
        price: 2499,
        discountPrice: 1699,
        stock: 15,
        images: [
          "https://picsum.photos/seed/1595777712802-2b23f3b1f50f/600/600",
        ],
        colors: ["Black"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.9,
        numReviews: 23,
        featured: true,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },
      {
        name: "Colorful Floral Summer Dress",
        slug: "floral-summer-dress",
        description: "Vibrant floral print summer dress perfect for warm days",
        category: createdCategories[3]._id,
        type: "clothing",
        gender: "female",
        brand: "SummerStyle",
        price: 1299,
        discountPrice: 799,
        stock: 38,
        images: [
          "https://picsum.photos/seed/1572804419116-fc6e6b5b42de/600/600",
        ],
        colors: ["Multicolor", "Pink"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.5,
        numReviews: 35,
        featured: true,
        bestSeller: false,
        flashSale: true,
        status: "active",
      },

      // Kitchen Appliances
      {
        name: "Stainless Steel Blender",
        slug: "stainless-steel-blender",
        description: "Powerful blender with multiple speed settings for smooth blending",
        category: createdCategories[6]._id, // Kitchen Appliances
        type: "appliance",
        brand: "KitchenPro",
        price: 3499,
        discountPrice: 2299,
        stock: 22,
        images: [
          "https://picsum.photos/seed/1578500494198-246f612d03b3/600/600",
        ],
        colors: ["Silver"],
        sizes: ["1.5L", "2L"],
        rating: 4.6,
        numReviews: 44,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "Electric Kettle",
        slug: "electric-kettle",
        description: "Fast-boiling electric kettle with auto-shutoff feature",
        category: createdCategories[6]._id,
        type: "appliance",
        brand: "QuickHeat",
        price: 1299,
        discountPrice: 799,
        stock: 60,
        images: [
          "https://picsum.photos/seed/1586521221914-3f3257df643d/600/600",
        ],
        colors: ["Black", "White"],
        sizes: ["1.8L", "2.2L"],
        rating: 4.7,
        numReviews: 78,
        featured: true,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },
      {
        name: "Toaster 4-Slice",
        slug: "toaster-4-slice",
        description: "Compact 4-slice toaster with adjustable browning control",
        category: createdCategories[6]._id,
        type: "appliance",
        brand: "BreakfastEssentials",
        price: 2499,
        discountPrice: 1599,
        stock: 35,
        images: [
          "https://picsum.photos/seed/1584568694244-14fbdf83bd30/600/600",
        ],
        colors: ["Silver", "Black"],
        sizes: ["Standard"],
        rating: 4.4,
        numReviews: 31,
        featured: false,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },

      // Washing Machines
      {
        name: "Fully Automatic Washing Machine",
        slug: "fully-auto-washing-machine",
        description: "Advanced fully automatic washing machine with multiple wash modes",
        category: createdCategories[7]._id, // Washing Machines
        type: "appliance",
        brand: "LaundryMax",
        price: 24999,
        discountPrice: 18999,
        stock: 10,
        images: [
          "https://picsum.photos/seed/1558618666-fcd25c85cd64/600/600",
        ],
        colors: ["White", "Silver"],
        sizes: ["6.5kg", "7kg", "8kg"],
        rating: 4.8,
        numReviews: 56,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "Semi-Automatic Washing Machine",
        slug: "semi-auto-washing-machine",
        description: "Durable semi-automatic washing machine, economical and efficient",
        category: createdCategories[7]._id,
        type: "appliance",
        brand: "EconomyWash",
        price: 9999,
        discountPrice: 7499,
        stock: 18,
        images: [
          "https://picsum.photos/seed/1584622181563-430f63602d4b/600/600",
        ],
        colors: ["White", "Grey"],
        sizes: ["6kg", "7kg"],
        rating: 4.3,
        numReviews: 28,
        featured: false,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },

      // Refrigerators
      {
        name: "Double Door Refrigerator",
        slug: "double-door-refrigerator",
        description: "Spacious double-door refrigerator with smart temperature control",
        category: createdCategories[8]._id, // Refrigerators
        type: "appliance",
        brand: "CoolTech",
        price: 34999,
        discountPrice: 26999,
        stock: 8,
        images: [
          "https://picsum.photos/seed/1584568694244-14fbdf83bd30/600/600",
        ],
        colors: ["Silver", "Black"],
        sizes: ["500L", "600L"],
        rating: 4.7,
        numReviews: 42,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "Single Door Refrigerator",
        slug: "single-door-refrigerator",
        description: "Compact single-door refrigerator ideal for small families",
        category: createdCategories[8]._id,
        type: "appliance",
        brand: "CompactCool",
        price: 14999,
        discountPrice: 11499,
        stock: 14,
        images: [
          "https://picsum.photos/seed/1573979459754-10ca0a1d6fe5/600/600",
        ],
        colors: ["White", "Silver"],
        sizes: ["250L", "300L"],
        rating: 4.5,
        numReviews: 35,
        featured: false,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },

      // Air Conditioners
      {
        name: "Split AC 1.5 Ton",
        slug: "split-ac-1-5-ton",
        description: "Energy-efficient split AC with cooling and heating mode",
        category: createdCategories[9]._id, // Air Conditioners
        type: "appliance",
        brand: "CoolBreeze",
        price: 29999,
        discountPrice: 22999,
        stock: 12,
        images: [
          "https://picsum.photos/seed/1585519504555-8accf3b0b62e/600/600",
        ],
        colors: ["White"],
        sizes: ["1.5 Ton"],
        rating: 4.6,
        numReviews: 39,
        featured: true,
        bestSeller: true,
        flashSale: true,
        status: "active",
      },
      {
        name: "Window AC 1 Ton",
        slug: "window-ac-1-ton",
        description: "Compact window AC perfect for small rooms and offices",
        category: createdCategories[9]._id,
        type: "appliance",
        brand: "EasyInstall",
        price: 13999,
        discountPrice: 10499,
        stock: 20,
        images: [
          "https://picsum.photos/seed/1585771724684-38269d6639fd/600/600",
        ],
        colors: ["White"],
        sizes: ["1 Ton"],
        rating: 4.4,
        numReviews: 32,
        featured: false,
        bestSeller: true,
        flashSale: false,
        status: "active",
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${products.length} products`);

    // ============ ORDERS ============
    const mkOrderItems = (items) =>
      items.map((it) => ({
        product: it.productId,
        name: it.name,
        price: it.price,
        quantity: it.qty,
      }));

    const orders = [
      {
        orderNumber: "ORD10000001",
        user: createdUsers[1]._id, // John Doe
        items: mkOrderItems([
          { productId: createdProducts[0]._id, name: "Classic Blue T-Shirt", price: 399, qty: 2 },
          { productId: createdProducts[1]._id, name: "White Graphic T-Shirt", price: 499, qty: 1 },
        ]),
        itemsPrice: 1297,
        shippingPrice: 0,
        totalPrice: 1297,
        shippingAddress: {
          fullName: "John Doe",
          phone: "8765432109",
          street: "456 Customer Lane",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
        paymentMethod: "card",
        paymentStatus: "paid",
        status: "delivered",
      },
      {
        orderNumber: "ORD10000002",
        user: createdUsers[2]._id, // Jane Smith
        items: mkOrderItems([
          { productId: createdProducts[3]._id, name: "Formal White Shirt", price: 899, qty: 1 },
          { productId: createdProducts[7]._id, name: "Elegant Black Evening Dress", price: 1699, qty: 1 },
        ]),
        itemsPrice: 2598,
        shippingPrice: 0,
        totalPrice: 2598,
        shippingAddress: {
          fullName: "Jane Smith",
          phone: "7654321098",
          street: "789 User Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
        },
        paymentMethod: "upi",
        paymentStatus: "paid",
        status: "processing",
      },
      {
        orderNumber: "ORD10000003",
        user: createdUsers[1]._id,
        items: mkOrderItems([
          { productId: createdProducts[11]._id, name: "Stainless Steel Blender", price: 2299, qty: 1 },
        ]),
        itemsPrice: 2299,
        shippingPrice: 0,
        totalPrice: 2299,
        shippingAddress: {
          fullName: "John Doe",
          phone: "8765432109",
          street: "456 Customer Lane",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
        paymentMethod: "card",
        paymentStatus: "paid",
        status: "shipped",
      },
    ];

    await Order.insertMany(orders);
    console.log("✅ Created 3 sample orders");

    // ============ ADVERTISEMENTS ============
    const ads = [
      {
        title: "Mega Fashion Sale",
        subtitle: "Up to 60% off on trending clothing",
        image: "https://picsum.photos/seed/1483985988355-763728e1935b/1200/400",
        link: "/clothing",
        position: "hero",
        type: "clothing",
        priority: 10,
        status: "active",
      },
      {
        title: "Home Appliances Fest",
        subtitle: "Best deals on kitchen & cooling appliances",
        image: "https://picsum.photos/seed/1556909114-f6e7ad7d3136/1200/400",
        link: "/appliances",
        position: "top-banner",
        type: "appliance",
        priority: 8,
        status: "active",
      },
      {
        title: "New Arrivals",
        subtitle: "Fresh styles just dropped",
        image: "https://picsum.photos/seed/1490481651871-ab68de25d43d/600/600",
        link: "/clothing",
        position: "in-feed",
        type: "clothing",
        priority: 5,
        status: "active",
      },
    ];

    await Advertisement.insertMany(ads);
    console.log("✅ Created 3 advertisements");

    console.log("\n✨ Database seeded successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("Admin - Email: admin@dstore.com | Password: admin123");
    console.log("User - Email: john@example.com | Password: password123");
    console.log("User - Email: jane@example.com | Password: password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  }
};

// Run seeding
connectDB().then(() => seedData());
