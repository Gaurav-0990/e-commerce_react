// const mongoose = require("mongoose");
// const userModel = require("./src/models/user.model");
// require('dotenv').config();

// const createTestUser = async () => {
//     try {
//         const mongoURI = process.env.MONGO_URI || "mongodb+srv://gaurav:ttlshiwwyauatwshladits@cluster0.bhvqzdl.mongodb.net/e-commerce_react?retryWrites=true&w=majority&appName=Cluster0";
//         await mongoose.connect(mongoURI);

//         // Check if test user already exists
//         const existingUser = await userModel.findOne({ email: "test@example.com" });
//         if (existingUser) {
//             console.log("✅ Test user already exists");
//             return;
//         }

//         // Create test user
//         const testUser = new userModel({
//             name: "Test User",
//             email: "test@example.com",
//             password: "test123"
//         });

//         await testUser.save();
//         console.log("✅ Test user created successfully");
//         console.log("📧 Email: test@example.com");
//         console.log("🔑 Password: test123");

//     } catch (error) {
//         console.error("❌ Error creating test user:", error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// createTestUser();
