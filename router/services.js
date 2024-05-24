import express from "express";
import { Services } from "../Model/services.js";
import { getCurrentDate } from "../service.js";

let router = express.Router();

// Create service details
router.post("/create", async (req, res) => {
  try {
    let createdAt = getCurrentDate();
    await new Services({
      customerName: req.body.name,
      customerPhone: req.body.phone,
      serviceType: req.body.serviceType,
      address: req.body.address,
      remarks: req.body.remarks,
      createdAt: createdAt,
      serviceAssignTo: req.body.serviceAssignTo,
      serviceDate : req.body.serviceDate,
    }).save();

    res.status(200).json({ message: "Service Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get service details
router.get("/get", async (req, res) => {
  try {
    let getAllServiceDetails = await Services.find({
      isPending: false,
      isCompleted: false,
    });
    res
      .status(200)
      .json({ message: "Fetched All Service Details!", getAllServiceDetails });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// Completed Service data
router.get("/get-completed", async (req, res) => {
  try {
    let getAllServiceDetails = await Services.find({
      isCompleted: true,
    });
    res
      .status(200)
      .json({ message: "Fetched Completed Service Details!", getAllServiceDetails });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// Pending Service Data
router.get("/get-pending", async (req, res) => {
  try {
    let getAllServiceDetails = await Services.find({
      isPending: true,
    });
    res
      .status(200)
      .json({ message: "Fetched pending Service Details!", getAllServiceDetails });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// Update Services
router.put("/edit", async(req, res) => {
  try {
    let customerName = req.body.name
    let customerPhone = req.body.phone
    let serviceDate = req.body.date
    let id = req.body.id;
    await Services.findOneAndUpdate({_id:id},
      {$set:{
        customerName,
        customerPhone,
        serviceDate,
      }}
    )
    res.status(200).json({message:"Service Updated Successfully!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error:error.message})
  }
})
// Delete Services
router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
     await Services.findByIdAndDelete({ _id:id });
    res.status(200).json({ message: "Service Deleted Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export let services = router;
