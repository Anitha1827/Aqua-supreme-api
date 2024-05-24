import mongoose from "mongoose";

let customerSchema = new mongoose.Schema({
    customerName:{
        type:"string"
    },
    customerPhone:{
        type:"string",
    },
    address:{
        type:"string"
    },
    isInstallationAssignTo:{
        type:"string",
    },
    lastServicedAt:{
        type:"string"
    },
    custDetails:{
        type:"string"
    },
    installationRemarks:{
        type:"string",
    },
    isServicePending:{
        type:"boolean",
    },
    isInstallationPending:{
        type:"boolean",
        default:false,
    },
    isInstallationCompleted:{
        type:"boolean",
        default:false,
    },
    duedate:{
        type:"string",
    },
});

let Customer = mongoose.model("Customer", customerSchema);
export {Customer}