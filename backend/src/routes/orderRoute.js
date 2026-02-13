import express from "express"
import { hashToken } from "../middleware/hashToken.js"
import { checkout, getAllOrders, getMyOrders } from "../controllers/orderController.js"

const orderRoute=express.Router()

orderRoute.post("/checkout",hashToken,checkout)
orderRoute.get("/getMyOrder",hashToken,getMyOrders)
orderRoute.get("/getAllOrder",hashToken,getAllOrders)

export default orderRoute
