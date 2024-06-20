import express from "express";
import bcrypt from "bcrypt";
import { decodeJwtToken, generateJwtToken } from "../service.js";
import { Admin } from "../Model/admin.js";
import { User } from "../Model/user.js";

let router = express.Router();

// Admin Signup
router.post("/signup", async (req, res) => {
  try {
    // Find Admin already registered
    let user = await Admin.findOne({ phone: req.body.phone });
    if (user) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    // generate hash password
    let salt = await bcrypt.genSalt(9);
    let hashedpassword = await bcrypt.hash(req.body.password, salt);
    // Add new Admin
    let newUser = await new Admin({
      phone: req.body.phone,
      password: hashedpassword,
    }).save();

    // generate jwt token
    let token = generateJwtToken(newUser._id);
    res.status(200).json({ message: "Signup successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
// Admin Login
router.post("/login", async (req, res) => {
  try {
    let user = await Admin.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
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

// Reset password
router.put("/reset-password", async (req, res) => {
  try {
    let newpassword = req.body.newPassword;
    let oldpassword = req.body.oldPassword;

    let resp = await Admin.find();
    let admin = resp[0];
    let valiedatePassword = await bcrypt.compare(oldpassword, admin.password);

    console.log("valied", valiedatePassword);
    if (!valiedatePassword) {
      return res.status(200).json({ message: "Invalid Password" });
    }

    // generate hash password
    let salt = await bcrypt.genSalt(9);
    let hashedpassword = await bcrypt.hash(newpassword, salt);

    await Admin.findOneAndUpdate(
      { phone: admin.phone },
      {
        $set: {
          password: hashedpassword,
        },
      }
    );
    res.status(200).json({ message: "Password Reset Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//find user type (admin/service engineer)
router.post("/find-user", async (req, res) => {
  try {
    let token = req.body.token;
    let id = decodeJwtToken(token);

    let admin = await Admin.findById({ _id: id });
    let type = "serviceEngineer";

    if (admin) {
      type = admin.phone == "987654321" ? "Owner" : "admin";
      return res
        .status(200)
        .json({ message: "User type got Successfully!", type });
    }
    //finding service engineer
    let user = await User.findById({ _id: id });
    res
      .status(200)
      .json({
        message: "User type got Successfully!",
        type,
        user: { name: user.name, phone: user.phone },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export let authrouter = router;
