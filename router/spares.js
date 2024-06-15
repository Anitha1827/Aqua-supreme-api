import express from "express";
import { Spares } from "../Model/spares.js";

let router = express.Router();

// Create a spares
router.post("/sparecreate", async (req, res) => {
  try {
    // add data to db
    await new Spares({
      spareName: req.body.spareName,
      spareNumber: req.body.spareNumber,
    }).save();
    res.status(200).json({ message: "Spares added Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// update spare
router.put("/spareupdate", async (req, res) => {
  try {
    let { id, spareName, spareNumber } = req.body;
    await Spares.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          spareName,
          spareNumber,
        },
      }
    );
    res.status(200).json({ message: "Spare updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get spares
router.get("/getspare", async (req, res) => {
  try {
    let getSpare = await Spares.find();
    res
      .status(200)
      .json({ message:"Fetched Spare details Successfully!", getSpare });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete Spares
router.delete("/deletespare/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Spares.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted spares details Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export let Sparesrouter = router;
