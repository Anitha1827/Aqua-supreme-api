import express from "express";
import { Customer } from "../Model/customer.js";
import { getCurrentDate, getdueDate } from "../service.js";
import { Services } from "../Model/services.js";

let router = express.Router();

// Create Installation Cutomer details
router.post("/create", async (req, res) => {
  try {
    let createdAt = getCurrentDate();

    // Adding new Customer details to DB
    await new Customer({
      customerName: req.body.name,
      customerPhone: req.body.phone,
      address: req.body.address,
      createdAt: createdAt,
      duedate:req.body.date,
      custDetails: req.body.custDetails, // without info
      isInstallationCompleted: false,
      isServicePending: false,
      product:req.body.product,
    }).save();

    res.status(200).json({ message: "Customer Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Create new customer details
router.post("/createnew-customer", async (req, res) => {
  try {
    let createdAt = getCurrentDate();

    // Adding new Customer details to DB
    await new Customer({
      customerName: req.body.name,
      customerPhone: req.body.phone,
      address: req.body.address,
      createdAt:createdAt,
      duedate: req.body.duedate,
      custDetails: req.body.custDetails, // without info
      isInstallationCompleted: false,
      isinstalled:true,
      isServicePending: false,
      product:req.body.product
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
    let lastServicedAt = isInstallationCompleted ? getCurrentDate() : "";
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          installationRemarks,
          isInstallationPending,
          isInstallationCompleted,
          isinstalled:isInstallationCompleted,
          duedate,
          lastServicedAt,
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

//update duedate 
router.put("/edit-duedate", async (req, res) => {
  try {
    let date = req.body.date;
    let id = req.body.id;
    await Customer.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          duedate:date,
        },
      }
    );
    res.status(200).json({ message: "Service due date Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//next service reminder
router.get("/service-reminder", async (req, res) => {
  try {
   let data =  await Customer.find({isinstalled:true, isServicePending:false});
    res.status(200).json({ message: "Service reminder data fetched Successfully!",data });
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
    let lastServicedAt = getCurrentDate();
    await Customer.findByIdAndUpdate(
      { _id: id },
      { $set: { isInstallationCompleted: true, duedate, isinstalled:true,lastServicedAt} }
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
    let address = req.body.address;
    let id = req.body.id;
    let duedate = req.body.duedate

    await Customer.findOneAndUpdate(
      { _id: id },
      { $set: { customerName, customerPhone, address,duedate } }
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
