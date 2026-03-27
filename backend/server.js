import express from "express"
import dotenv from "dotenv/config"
import { dbConnection } from "./src/config/dbConnection.js";
import userRoute from "./src/routes/userRoute.js";
import cors from "cors"
import foodRoute from "./src/routes/foodRoute.js";
import cartRoute from "./src/routes/cartRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.port || 8001;


dbConnection()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json())
app.use(cookieParser());
app.use("/user", userRoute)
app.use("/food", foodRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)

app.listen(port, () => {
    console.log(`post number ${port}`)
})