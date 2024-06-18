import express from "express"
import { User } from "../Model/user.js";

let router = express.Router();
// Add new user to DB
router.post("/add-new-user", async (req, res) => {
    try {
      await new User({
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        password:req.body.password,
      }).save();
  
      res.status(200).json({ message: "New User added successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Edit user details
  router.put("/edit-user", async (req, res) => {
    try {
        let {name,phone,email,password,id} = req.body;
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