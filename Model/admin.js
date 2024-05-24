import mongoose from "mongoose";

let adminSchema = new mongoose.Schema({
  phone: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

let Admin = mongoose.model("Admin", adminSchema);
export { Admin };
