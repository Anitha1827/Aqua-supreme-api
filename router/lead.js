import express from "express";
import { Lead } from "../Model/lead.js";

let router = express.Router();

// Add lead to DB
router.post("/addlead", async (req, res) => {
  try {
    await new Lead({
      name: req.body.name,
      phone: req.body.phone,
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
    let { id, name, phone } = req.body;
    await Lead.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          phone,
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
