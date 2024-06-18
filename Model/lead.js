import mongoose from "mongoose";

let leadSchema = new mongoose.Schema({
    name:{
        type:"string"
    },
    phone:{
        type:"string",
    },
    feedback:{
        type:"string",
    },
});

let Lead = mongoose.model("Lead", leadSchema);
export {Lead}