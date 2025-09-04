const express = require("express");
const cartModel = require("../models/cart.model");
const router = express.Router();

// For now, using demo user (replace with JWT middleware later)
// Middleware to extract userId from authenticated request (replace with your JWT logic)
function getUserId(req) {
  // Example: If using JWT and attaching user info to req.user
  return req.user && req.user.id;
}

// ✅ GET /cart - Fetch all items for user with product details
router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const cartItems = await cartModel
      .find({ userId })
      .populate("productId");
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// ✅ POST /cart/add/:productId - Add product or increase quantity
router.post("/add/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Using upsert to avoid duplicate check
    const cartItem = await cartModel.findOneAndUpdate(
      { userId, productId },
      { $inc: { quantity: 1 } }, // Increase if exists
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ PUT /cart/increase/:cartItemId
router.put("/increase/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await cartModel.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json({ message: "Quantity increased", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ PUT /cart/decrease/:cartItemId
router.put("/decrease/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await cartModel.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.status(200).json({ message: "Quantity decreased", cartItem });
    } else {
      await cartModel.findByIdAndDelete(cartItemId);
      res.status(200).json({ message: "Cart item removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
