import express from "express";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../service.js";
import { Admin } from "../Model/admin.js";

let router = express.Router();

// Admin Signup
// router.post("/signup", async (req, res) => {
//   try {
//     // Find Admin already registered
//     let user = await Admin.findOne({ phone: req.body.phone });
//     if (user) {
//       return res.status(400).json({ message: "Phone already registered" });
//     }

//     // generate hash password
//     let salt = await bcrypt.genSalt(9);
//     let hashedpassword = await bcrypt.hash(req.body.password, salt);
//     // Add new Admin
//     let newUser = await new Admin({
//       phone: req.body.phone,
//       password: hashedpassword,
//     }).save();

//     // generate jwt token
//     let token = generateJwtToken(newUser._id);
//     res.status(200).json({ message: "Signup successfully!", token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });
// Admin Login 
router.post("/login", async (req, res) => {
  try {
    let user = await Admin.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(400).json({ message: "Invalied Credentials" });
    }

    // valiedate password
    let valiedatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valiedatePassword) {
      return res.status(400).json({ message: "Incalied Password" });
    }

    // generate jwtToken
    let token = generateJwtToken(user._id);
    res.status(200).json({ message: "Login Successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});



export let authrouter = router;
