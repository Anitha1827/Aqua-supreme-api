import express from "express";
import { Services } from "../Model/services.js";
import { getCurrentDate, getdueDate } from "../service.js";
import { Customer } from "../Model/customer.js";
import { Spares } from "../Model/spares.js";

let router = express.Router();

// Create service details
router.post("/create", async (req, res) => {
  try {
    let createdAt = getCurrentDate();
    await new Services({
      customerId: req.body.customerId,
      customerPhone: req.body.phone,
      customerName:req.body.customerName,
      serviceType: req.body.serviceType,
      createdAt: createdAt,
      serviceDate: req.body.duedate,
    }).save();
    await Customer.findByIdAndUpdate(
      { _id: req.body.customerId },
      {
        $set: {
          isServicePending: true,
          duedate:req.body.duedate,
        },
      }
    );

    res.status(200).json({ message: "Service Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get service details // in service page it will show
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
    let spares = req.body.selectedSpares;
    let service = await Services.findById({ _id: id });
    let customer = await Customer.findById({ _id: service.customerId });
    let duedate = isCompleted ? getdueDate() : customer.duedate;
    let lastServicedAt = isCompleted ? getCurrentDate() : customer.lastServicedAt ? customer.lastServicedAt: "";
    let serviceCount = isCompleted ? customer.serviceCount + 1 : customer.serviceCount 
    let updatedAt = getCurrentDate();

    await Services.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          remarks,
          isPending,
          isCompleted,
          updatedAt,
          spares,
        },
      }
    );
    await Customer.findOneAndUpdate(
      { _id: service.customerId },
      {
        $set: {
          duedate,
          isServicePending: isPending,
          lastServicedAt,
          serviceCount,
        },
      }
    );
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
    let spare = req.body.selectedSpares;
    let duedate = getdueDate();
    let lastServicedAt =  getCurrentDate();
    await Services.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isCompleted: true,
          isPending: false,
          updatedAt:lastServicedAt,
          spare,
        },
      }
    );
    let customer = Services.findById({ _id: id });
    let customerDetails = Customer.findById({_id:customer.customerId});
    await Customer.findOneAndUpdate(
      { _id: customer.customerId },
      {
        $set: {
          duedate,
          isServicePending: false,
          lastServicedAt,
          serviceCount:customerDetails.serviceCount + 1,
        },
      }
    );
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

// Update  Services Phone number
router.put("/edit-phone", async (req, res) => {
  try {
    let customerPhone = req.body.phone;
    let id = req.body.id;
    await Services.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          customerPhone,
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
    let service = Services.findById({_id:id});
    await Customer.findByIdAndUpdate({_id:service.customerId},{$set:{
      isServicePending:false
    }})
    await Services.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Service Deleted Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export let services = router;
