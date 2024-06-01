import express from "express";
import { Customer } from "../Model/customer.js";
import { getCurrentDate, getdueDate } from "../service.js";
import { Services } from "../Model/services.js";

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

// Get All customer details for installation 
router.get("/get", async (req, res) => {
  try {
    let getAllCustomerDetails = await Customer.find({
      isInstallationPending: false,
      isInstallationCompleted: false,
    });
    res.status(200).json({
      message: "Fetched Customer details Succesfully!",
      getAllCustomerDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all customer
router.get("/getAll", async(req, res) => {
  try {
    let getAllCustomerDetails = await Customer.find();
    res.status(200).json({message:"Fetched all Customer details Succuessfully!",getAllCustomerDetails})
  } catch (error) {
    console.log(error);
    res.status(500).json({erro:error.message})
  }
})

// Get Details by ID
router.get("/get-by-id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Customer.findById({ _id: id});
    let service = await Services.find({customerPhone:data.customerPhone});
    data["service"] = service;
    res.status(200).json({
      message: "Fetched Customer Details from ID",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Assign technician to data
router.put("/assign-technician/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isInstallationAssignTo: req.body.isInstallationAssignTo,
        },
      }
    );
    res.status(200).json({ message: "Technician assigned Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Installation status
router.put("/installation-status/:id", async (req, res) => {
  try {
    let { installationRemarks,isInstallationPending,isInstallationCompleted} = req.body
    let id = req.params.id;

    console.log("status",installationRemarks,isInstallationPending,isInstallationCompleted,id)
    let installation = await Customer.findById({_id:id});
    let duedate = isInstallationCompleted ? getdueDate() : installation.duedate
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          installationRemarks,
          isInstallationPending,
          isInstallationCompleted,
          duedate,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Installation Status Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get Installation completion data
router.get("/installation-completed-data", async (req, res) => {
  try {
    let getdata = await Customer.find({ isInstallationCompleted: true });
    res.status(200).json({
      message: "Installation completion data fetched Successfully!",
      getdata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get Installation Pending data
router.get("/installation-pending-data", async (req, res) => {
  try {
    let getpendingdata = await Customer.find({ isInstallationPending: true });
    res
      .status(200)
      .json({
        message: "Installation Pending data updated Successfully!",
        getpendingdata,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Installation completion status update
router.put("/installation-completion/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let duedate = getdueDate();

    await Customer.findByIdAndUpdate(
      { _id: id },
      { $set: { isInstallationCompleted: true, duedate} }
    );
    res
      .status(200)
      .json({ message: "Installation completion updated successfully!" });
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
