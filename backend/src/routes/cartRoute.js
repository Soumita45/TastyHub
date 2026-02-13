import express from "express"
import { addToCart,getCart, removeCartItem, updateCart } from "../controllers/cartController.js"
import { hashToken } from "../middleware/hashToken.js"

const cartRoute=express.Router()

cartRoute.post("/addToCart",hashToken,addToCart)
cartRoute.put("/updateCart",hashToken,updateCart)
cartRoute.get("/getCart",hashToken,getCart)
cartRoute.delete("/removeCartItem",hashToken,removeCartItem)

export default cartRoute