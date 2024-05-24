import express from "express";
import { getCurrentDate } from "../service.js";
import { Customer } from "../Model/customer.js";

let router = express.Router();

// Create Installation Details
router.post("/create-installation", async (req, res) => {
  try {
    let currentDate = getCurrentDate();
    // Adding New Installation to DB // doubt : we already created DB for customer can we use same for installation
    await new Customer({
      customerName: req.body.name,
      customerPhone: req.body.phone,
      address: req.body.address,
      isInstallationAssignTo: req.body.isInstallationAssignTo,
      custDetails: req.body.custDetails,
      currentDate:currentDate,
      isInstalled: false,
      installationRemarks: req.body.installationRemarks,
      isServicePending: false,
    }).save();
    res.status(200).json({message:"New Installation Customer Added Successfully!"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get Installation added Customer details
router.get("/get-installation", async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}) 
