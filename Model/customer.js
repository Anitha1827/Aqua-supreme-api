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
    isInstallationCompleted:{  // if true: installedby us, else:installed by outside
        type:"boolean",
        default:false,
    },
    duedate:{
        type:"string",
    },
    serviceCount:{
        type:"string"
    },
    product:{
        type:"string",
    },
    isinstalled:{   //chech is installed or not
        type:"boolean",
        default:false,
    },
});

let Customer = mongoose.model("Customer", customerSchema);
export {Customer}