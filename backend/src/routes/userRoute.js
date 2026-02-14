import express from "express"
import { hashToken } from "../middleware/hashToken.js"
import { deleteProfile, getProfile, login, logout, register } from "../controllers/userController.js"
import { loginSchema, registerSchema, Validate } from "../utils/validation.js"
import { verifiyToken } from "../middleware/tokenVerification.js"


const userRoute = express.Router()

userRoute.post("/login", Validate(loginSchema), login)
userRoute.post("/register", Validate(registerSchema), register)
userRoute.get("/verify",verifiyToken)
userRoute.delete("/logout", hashToken, logout)
userRoute.get("/getProfile", hashToken, getProfile)
userRoute.delete("/deleteProfile", hashToken, deleteProfile)

export default userRoute