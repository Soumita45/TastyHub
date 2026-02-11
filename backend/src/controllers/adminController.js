import userSchema from "../models/userSchema.js";
import bacrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
     try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!"
            })
        }
        else {
            const passwordCheck = await bcrypt.compare(password, user.password,);
            if (!passwordCheck) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials!"
                });
            }
            else if (passwordCheck && user.isVerify === true) {

                await sessionSchema.findOneAndDelete({ userId: user._id });

                await sessionSchema.create({ userId: user._id });

                const accessToken = generateAccessToken(admin)
                const refreshToken = generateAccessToken(admin)

                user.isLogin = true;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully!",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user
                })
            }
            else {
                return res.status(200).json({
                    message: "Please verify yourself and then Login!"
                });
            }

        }
    }
   catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const adminLogout= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}