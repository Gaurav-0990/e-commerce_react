const express = require("express")
const productModel = require("../models/product.model")
const sampleProducts = require("../data/sampleProducts")

const router = express.Router()



router.get("/", async(req, res)=>{
   const productsCount = await productModel.countDocuments();

   if(productsCount === 0){
      // Insert sample products if collection is empty
      await productModel.insertMany(sampleProducts);
   }

   const products = await productModel.find()

    res.status(200).json({message : "data found" , products})
})



module.exports = router