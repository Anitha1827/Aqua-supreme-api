import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
    productname:{
        type:"string",
    },
    productmodel:{
        type:"string",
    },
});

let Product = mongoose.model("Product",productSchema);
export {Product}