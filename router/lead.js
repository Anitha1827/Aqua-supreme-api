import express from "express";
import { Lead } from "../Model/lead.js";
import { getCurrentDate } from "../service.js";

let router = express.Router();

// Add lead to DB
router.post("/addlead", async (req, res) => {
  try {
    let createdAt = getCurrentDate();
    await new Lead({
      name: req.body.name,
      phone: req.body.phone,
      feedback:req.body.feedback,
      createdAt: createdAt,
      handleBy:req.body.handleBy,
    }).save();
    res.status(200).json({ message: "Lead added Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Edit lead
router.put("/editlead", async (req, res) => {
  try {
    let { id, name, phone,feedback,handleBy } = req.body;
    await Lead.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          phone,
          feedback,
          handleBy,
        },
      }
    );
    res.status(200).json({ message: "lead updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get added lead
router.get("/getlead", async (req, res) => {
  try {
    let getlead = await Lead.find();
    res
      .status(200)
      .json({ message: "lead data fetched Successfully!", getlead });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete the lead
router.delete("/delete-lead/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Lead.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "deleted lead data successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export let leadrouter = router;
