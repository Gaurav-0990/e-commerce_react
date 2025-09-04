const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const SignInRouter = require("./src/routes/SignIn.Router");
const SignUpRouter = require("./src/routes/SignUp.Router");
const productRouter = require("./src/routes/product.router");
const userRouter = require("./src/routes/user.router");
const cartRouter = require("./src/routes/cart.router");
const indexRouter = require("./src/routes/index.router");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/SignIn", SignInRouter);
app.use("/api/SignUp", SignUpRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api", indexRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
