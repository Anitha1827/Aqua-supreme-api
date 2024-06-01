import mongoose from "mongoose";

let NotificationSchema = new mongoose.Schema({
    userId : {
        type:"string",
    },
    userName:{
        type:"string",
    },
    dueDate:{
        type:"string",
    },
    isView:{
        type:"string",
    },
});

let Notification = mongoose.model("Notification", NotificationSchema);
export {Notification};
