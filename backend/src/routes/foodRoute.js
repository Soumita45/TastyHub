import express from "express"
import { hashToken } from "../middleware/hashToken.js"
import { addFoodSchema, Validate } from "../utils/validation.js"
import { addFood, deleteFood, getAllFood, getSingleFood, updateFood } from "../controllers/foodContoller.js"
import { upload } from "../controllers/multerController.js"

const foodRoute = express.Router()

foodRoute.post("/addFood", hashToken, upload.single("image"), Validate(addFoodSchema), addFood)
foodRoute.get("/getAllFood",hashToken,getAllFood)
foodRoute.get("/getSingleFood/:id",hashToken,getSingleFood)
foodRoute.delete("/deleteFood/:id",hashToken,deleteFood)
foodRoute.put("/updateFood/:id",hashToken,upload.single("image"),updateFood)
export default foodRoute