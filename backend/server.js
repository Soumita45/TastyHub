import express from "express"
import dotenv from "dotenv/config"
import { dbConnection } from "./src/config/dbConnection.js";
import userRoute from "./src/routes/userRoute.js";
import cors from "cors"
import foodRoute from "./src/routes/foodRoute.js";
import { upload } from "./src/controllers/multerController.js";
import cartRoute from "./src/routes/cartRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import wishlistRoute from "./src/routes/wishlistRoute.js";

const app=express()
const port=process.env.port|| 8001;


dbConnection()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("upload"))
app.use("/user",userRoute)
app.use("/food",foodRoute)
app.use("/cart",cartRoute)
app.use("/order",orderRoute)
app.use("/wishlist",wishlistRoute)

app.listen(port,()=>{
    console.log(`post number ${port}`)
})