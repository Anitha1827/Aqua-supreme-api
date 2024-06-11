import mongoose from "mongoose";

let serviceSchema = new mongoose.Schema({
    customerId:{
        type:"string",
    },
    customerName:{
        type:"string",
    },
    customerPhone:{
        type:"string",
    },
    address:{
        type:"string"
    },
    serviceAssignTo:{
        type:"string",
    },
    isPending:{
        type:"boolean",
        default:false,
    },
    isCompleted:{
        type:"boolean",
        default:false,
    },
    remarks:{
        type:"string",
    },
    createdAt:{
        type:"string",
    },
    serviceDate:{
        type:"string",
    },
    updatedAt:{
        type:"string",
    },
    serviceType:{
        type:"string"
    }
});

let Services = mongoose.model("Services", serviceSchema);
export {Services}