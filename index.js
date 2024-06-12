import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { dbConnection } from "./db.js";
import { authrouter } from "./router/admin.js";
import { customerrouter } from "./router/customer.js";
import { services } from "./router/services.js";
import { userRouter } from "./router/user.js";
import { getdueDate } from "./service.js";
import { productrouter } from "./router/product.js";
import { leadrouter } from "./router/lead.js";

// Config dotenv
dotenv.config();

getdueDate();
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
app.use("/api/product",productrouter);
app.use("/api/lead", leadrouter);

// initilizing port
let PORT = process.env.PORT

// Server connection
app.listen(PORT, console.log(`server Running on PORT ${PORT}`));