const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();

router.post("/ValidateUser", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    try {
        // Find user directly by email
        const user = await userModel.findOne({ email });

        if (!user) {
            console.log("❌ User doesn't exist");
            return res.status(200).json({ message: "User doesn't exist", out: false });
        }

        if (user.password !== password) {
            console.log("❌ Incorrect password");
            return res.status(200).json({ message: "Email or Password is incorrect", out: false });
        }

        console.log("✅ User authenticated successfully");
        return res.status(200).json({ message: "User Exists", out: true });

    } catch (error) {
        console.error("❌ Database error:", error);
        return res.status(500).json({ message: "Internal server error", out: false });
    }
});

module.exports = router;
