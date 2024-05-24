import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { dbConnection } from "./db.js";
import { authrouter } from "./router/admin.js";
import { customerrouter } from "./router/customer.js";
import { services } from "./router/services.js";
import { userRouter } from "./router/user.js";

// Config dotenv
dotenv.config();

// middleware
let app = express();
app.use(express.json());
app.use(cors());

// DB Connection
dbConnection();

// Test API
app.get("/", async(req, res) =>{
    res.send({
        message:"Water tank service application running Successfully!",
    })
})

// Api route
app.use("/api/auth",authrouter);
app.use("/api/service", services);
app.use("/api/customer",customerrouter);
app.use("/api/user", userRouter);

// initilizing port
let PORT = process.env.PORT

// Server connection
app.listen(PORT, console.log(`server Running on PORT ${PORT}`));