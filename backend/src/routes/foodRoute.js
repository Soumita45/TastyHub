import express from "express"
import { hashToken } from "../middleware/hashToken.js"
import { addFoodSchema, Validate } from "../utils/validation.js"
import { addFood, changeAvailability, deleteFood, getAllFood, getSingleFood, updateFood } from "../controllers/foodContoller.js"
import { upload } from "../controllers/multerController.js"

const foodRoute = express.Router()

foodRoute.post("/addFood", hashToken, upload.single("image"), Validate(addFoodSchema), addFood)
foodRoute.get("/getAllFood",getAllFood)
foodRoute.get("/getSingleFood/:id",getSingleFood)
foodRoute.delete("/deleteFood/:id",hashToken,deleteFood)
foodRoute.put("/updateFood/:id",hashToken,upload.single("image"),updateFood)
foodRoute.put("/changeAvailable/:id",hashToken,changeAvailability)

export default foodRoute