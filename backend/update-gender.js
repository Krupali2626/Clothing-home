require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./model/product.model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const updateGender = async () => {
  try {
    // Update products without gender to default ""
    const result = await Product.updateMany(
      { gender: { $exists: false } },
      { $set: { gender: "" } }
    );
    console.log(`✅ Updated ${result.nModified} products to have gender field`);
    
    // Optional: You could set some default genders based on category if needed
    // For example, set dresses to female
    // const category = await mongoose.model('Category').findOne({ slug: 'dresses' });
    // if (category) {
    //   await Product.updateMany(
    //     { category: category._id, gender: "" },
    //     { $set: { gender: "female" } }
    //   );
    //   console.log("✅ Updated dresses to female gender");
    // }
  } catch (error) {
    console.error("❌ Error updating gender:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  }
};

connectDB().then(() => updateGender());
