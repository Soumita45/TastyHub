import express from "express"
import { hashToken } from "../middleware/hashToken.js"
import { addToWishlist, getMyWishlist, removeFromWishlist } from "../controllers/wishlistController.js"

const wishlistRoute=express.Router()

wishlistRoute.post("/addToWishlist",hashToken,addToWishlist)
wishlistRoute.get("/getMyWishList",hashToken,getMyWishlist)
wishlistRoute.delete("/removeFromWishlist",hashToken,removeFromWishlist)

export default wishlistRoute