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
  email:{
    type:"string",
    unique:true,
  },
  password:{
    type:"string",
  }
});

let User = mongoose.model("User", userSchema);
export { User };
