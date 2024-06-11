import express from "express";
import { Product } from "../Model/product.js";

let router = express.Router();

//create product
router.post("/create", async (req, res) => {
  try {
    // adding new product to DB
    await new Product({
      productname: req.body.productname,
      productmodel: req.body.productmodel,
    }).save();
    res
      .status(200)
      .json({ message: "Product added to the database successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// update product
router.put("/update-product", async (req, res) => {
  try {
   let {id,productname,productmodel} = req.body;
    await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          productname,
          productmodel,
        },
      }
    );
    res.status(200).json({ message: "Product updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get product details
router.get("/getproduct", async (req, res) => {
  try {
    let getproduct = await Product.find();
    res
      .status(200)
      .json({ message: "Product details fetched successfully!", getproduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product details
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Product.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Product Deleted Successfully !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export let productrouter = router;
