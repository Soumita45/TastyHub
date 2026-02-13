import express from "express"
import { addToCart, checkout, getCart, removeCartItem, updateCart } from "../controllers/cartController.js"
import { hashToken } from "../middleware/hashToken.js"

const cartRoute=express.Router()

cartRoute.post("/addToCart",hashToken,addToCart)
cartRoute.put("/updateCart",hashToken,updateCart)
cartRoute.get("/getCart",hashToken,getCart)
cartRoute.post("/checkOut",hashToken,checkout)
cartRoute.delete("/removeCartItem",hashToken,removeCartItem)

export default cartRoute