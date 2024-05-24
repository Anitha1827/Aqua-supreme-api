import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  phone:{
    type:"string",
    required:true,
    unique:true,
  },
});

let User = mongoose.model("User", userSchema);
export { User };
