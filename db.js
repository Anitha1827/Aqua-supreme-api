import mongoose from "mongoose";
import dotenv from "dotenv";

// Config dotenv
dotenv.config();

export function dbConnection(){
    let mongo_url = process.env.mongo_URL
    try {
        mongoose.connect(mongo_url);
        console.log("Database Connected successfully!")
    } catch (error) {
        console.log(error.message)
    }
}