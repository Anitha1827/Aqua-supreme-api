import express from "express"
import { Area } from "../Model/area.js";

let router = express.Router();

//create area
router.post("/createarea", async(req, res) => {
    try {
        // add data to db
        await new Area({
            areaName:req.body.areaName
        }).save();
        res.status(200).json({message:"Area Added successfully!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
});

// update area
router.put("/updateArea", async(req, res) => {
    try {
        let {id,areaName} = req.body;

        await Area.findByIdAndUpdate({_id:id}, {$set:{
            areaName,
        }});
        res.status(200).json({message:"Area Updated successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
});

// get area
router.get("/fetcharea", async(req,res) =>{
try {
    let getArea = await Area.find();
    res.status(200).json({message:"Area Fetched Successfully!", getArea});
} catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
}
});

// Delete area
router.delete("/deleteArea/:id", async(req, res) => {
    try {
        let id = req.params.id;
        await Area.findByIdAndDelete({_id:id});
        res.status(200).json({message:"AreaName Deleted successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
});


export let Arearouter = router