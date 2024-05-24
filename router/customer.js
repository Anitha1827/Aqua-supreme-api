import express from "express";
import { Customer } from "../Model/customer.js";
import { getCurrentDate } from "../service.js";

let router = express.Router();

// Create Cutomer details
router.post("/create", async (req, res) => {
  try {
    let duedate = getCurrentDate();

    // Adding new Customer details to DB
    await new Customer({
      customerName: req.body.name,
      customerPhone: req.body.phone,
      address: req.body.address,
      isInstallationAssignTo: req.body.isInstallationAssignTo,
      lastServicedAt: req.body.date,
      duedate: duedate,
      custDetails: req.body.custDetails,
      isInstalled: false,
      installationRemarks: req.body.installationRemarks,
      isServicePending: false,
    }).save();

    res.status(200).json({ message: "Customer Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get All customer details
router.get("/get", async (req, res) => {
  try {
    let getAllCustomerDetails = await Customer.find({
      isInstallationPending: false,
      isInstallationCompleted: false,
    });
    res.status(200).json({
      message: "Fetched all Customer details Succesfully!",
      getAllCustomerDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Update Customer details
router.put("/update", async (req, res) => {
  try {
    let customerName = req.body.name;
    let customerPhone = req.body.phone;
    let lastServicedAt = req.body.date;
    let id = req.body.id;
    let duedate = getCurrentDate();

    await Customer.findOneAndUpdate(
      { _id: id },
      { $set: { customerName, customerPhone, lastServicedAt, duedate } }
    );
    res.status(200).json({ message: "Customer Updated Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete Customer details
router.delete("/cust-delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Customer.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Customer details succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
export let customerrouter = router;
