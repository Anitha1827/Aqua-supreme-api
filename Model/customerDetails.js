import mongoose from "mongoose";

let customerDetailsSchema = new mongoose.Schema({
  customerName: {
    type: "string",
  },
  customerPhone: {
    type: "string",
  },
  address: {
    type: "object",
    default: {},
  },
  lastServicedAt: {
    type: "string",
  },
  custDetails: {
    type: "string",
  },
  isServicePending: {
    type: "boolean",
  },
  duedate: {
    type: "string",
  },
  serviceCount: {
    type: "number",
    default: 0,
  },
  product: {
    type: "string",
  },
  isinstalled: {
    //chech is installed or not
    type: "boolean",
    default: false,
  },
  createdAt: {
    type: "string",
  },
  duedateReassignedCount: {
    type: "number",
    default: 0,
  },
  reminderMonth: {
    type: "string",
    default: "3",
  },
});

let Customer = mongoose.model("Customer", customerSchema);
export { Customer };
