import express from "express";
import { Services } from "../Model/services.js";
import { getCurrentDate, getdueDate } from "../service.js";
import { Customer } from "../Model/customer.js";

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
      serviceDate: req.body.serviceDate,
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

// Get service details by ID
router.get("/get-by-id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Services.findById({ _id: id });
    res
      .status(200)
      .json({ message: "Service details fetched by using Id", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Assign to technician
router.put("/assign-technician/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Services.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          serviceAssignTo: req.body.serviceAssignTo,
        },
      }
    );
    res.status(200).json({ message: "Technican assigned succussfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Service status
router.put("/service-status/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let remarks = req.body.remarks;
    let isPending = req.body.isPending;
    let isCompleted = req.body.isCompleted;

    let service = await Services.find({ _id: id });
    let duedate = isCompleted ? getdueDate() : service.serviceDate;

    await Services.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          remarks,
          isPending,
          isCompleted,
        },
      }
    );
    await Customer.findOneAndUpdate({customerPhone:service.customerPhone},{$set:{
      duedate
    }});
    res.status(200).json({ message: "Service status updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Service completion status update
router.put("/service-completion/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let duedate = getdueDate();
    await Services.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    let customer = Services.findById({_id:id})
    await Customer.findOneAndUpdate({customerPhone:customer.customerPhone},{$set:{
      duedate
    }})
    res
      .status(200)
      .json({ message: "Service Completion status update successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get Completed Service data
router.get("/get-completed", async (req, res) => {
  try {
    let getAllServiceDetails = await Services.find({
      isCompleted: true,
    });
    res.status(200).json({
      message: "Fetched Completed Service Details!",
      getAllServiceDetails,
    });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// get Pending Service Data
router.get("/get-pending", async (req, res) => {
  try {
    let getAllServiceDetails = await Services.find({
      isPending: true,
    });
    res.status(200).json({
      message: "Fetched pending Service Details!",
      getAllServiceDetails,
    });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// Update Services
router.put("/edit", async (req, res) => {
  try {
    let customerName = req.body.name;
    let customerPhone = req.body.phone;
    let serviceDate = req.body.date;
    let id = req.body.id;
    await Services.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          customerName,
          customerPhone,
          serviceDate,
        },
      }
    );
    res.status(200).json({ message: "Service Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// Delete Services
router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Services.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Service Deleted Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export let services = router;
