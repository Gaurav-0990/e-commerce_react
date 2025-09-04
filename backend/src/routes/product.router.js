const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});



router.post("/add", upload.single("image"), async (req, res) => {

  let imageUrl = "/placeholder.png"; // Default placeholder image

  // Only upload to ImageKit if image file is provided
  if (req.file) {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const result = await imagekit.upload({
      file : req.file.buffer,
      fileName : req.file.originalname,
      isPrivateFile : false,
      isPublished : true
    });

    imageUrl = result.url;
  }

  const { title, description, category, price } = req.body;

  const product = new productModel({
    title : title,
    description : description,
    category : category,
    price : price,
    image : imageUrl
  });

  await product.save();

  res.json({message : "Product added successfully", product});
});

router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", product });
});

router.get("/update/:id", async(req, res)=>{

    const productId = req.params.id

    const product = await productModel.findById(productId)


    res.render("updateForm",{product : product})
})


router.post("/update/:id",upload.single("image") ,async(req, res)=>{

    const productId = req.params.id

    console.log(req.body);
    
  const { title, description, category, price } = req.body;

  
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });


  const result = await imagekit.upload({
    file : req.file.buffer,
    fileName : req.file.originalname,
    isPrivateFile : false,
    isPublished : true
  })

  const imageUrl = result.url

    await productModel.findByIdAndUpdate(productId,{
    title : title,
    description : description,
    category : category,
    price : price,
    image : imageUrl
  })

  res.redirect(`/products/${productId}`)
    
})


router.get("/delete/:id" , async (req,res)=>{
    const productId = req.params.id

    await productModel.findByIdAndDelete(productId)

    res.redirect("/")
})

// ...existing code...

// Removed duplicate GET /:id route handler

// ...existing code...

module.exports = router;