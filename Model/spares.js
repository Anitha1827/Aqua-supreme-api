import mongoose from "mongoose";

let spareShema = new mongoose.Schema({
    spareName :{
        type:"string",
    },
    spareNumber:{
        type:"string",
    },
});

let Spares = mongoose.model("Spares", spareShema)
export {Spares}