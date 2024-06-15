import mongoose from "mongoose";

let areaSchema = new mongoose.Schema({
    areaName :{
        type:"string",
    },

});

let Area = mongoose.model("Area", areaSchema);
export {Area}