import express from "express"
import { User } from "../Model/user.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../service.js";

let router = express.Router();
// Add new user to DB
router.post("/add-new-user", async (req, res) => {
    try {
      let salt = await bcrypt.genSalt(9);
      let hashedpassword = await bcrypt.hash(req.body.password, salt);
      let user  = await User.findOne({phone:req.body.phone});
      if(user){
        res.status(202).json({message:"Number already exist!"})
      }
      await new User({
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        password:hashedpassword,
      }).save();
  
      res.status(200).json({ message: "New User added successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  //service engineers login
  router.post("/login", async (req, res) => {
    try {
      let user = await User.findOne({ phone: req.body.phone });
  
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

  
  // Edit user details
  router.put("/edit-user", async (req, res) => {
    try {
      let salt = await bcrypt.genSalt(9);
      let hashedpassword = await bcrypt.hash(req.body.password, salt);
        let password = hashedpassword;
        let {name,phone,email,id} = req.body;
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            phone,
            email,
            password,
          },
        }
      );
      res.status(200).json({ message: "User Details edited successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Deleting user details
  router.delete("/user-delete/:id", async (req, res) => {
    try {
      let id = req.params.id;
      await User.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "User details Deleted Successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get user Details
  router.get("/get-user", async (req, res) => {
    try {
      let getuser = await User.find();
      res.status(200).json({message:"User details fetched Successfully!",getuser});
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: error.message });
    }
  });
export let userRouter = router