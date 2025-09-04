// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const productModel = require("./src/models/product.model");
// const sampleProducts = require("./src/data/sampleProducts");

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI || "mongodb+srv://gaurav:ttlshiwwyauatwshladits@cluster0.bhvqzdl.mongodb.net/e-commerce_react?retryWrites=true&w=majority&appName=Cluster0";
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
//   } catch (error) {
//     console.error("❌ ERROR OCCURRED IN DATABASE CONNECTION:", error.message);
//     process.exit(1);
//   }
// };

// const importData = async () => {
//   try {
//     await connectDB();

//     // Delete all existing products
//     await productModel.deleteMany();
//     console.log("🗑️  All products deleted");

//     // Map sampleProducts to match schema
//     const products = sampleProducts.map(product => ({
//       title: product.title,
//       description: product.description,
//       category: product.category,
//       price: product.price,
//       image: product.image
//     }));

//     // Insert new products
//     await productModel.insertMany(products);
//     console.log("✅ Sample products inserted successfully");

//     process.exit();
//   } catch (error) {
//     console.error("❌ Error importing data:", error);
//     process.exit(1);
//   }
// };

// importData();
