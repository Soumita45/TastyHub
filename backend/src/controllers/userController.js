import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken, generateRegisterToken } from "../utils/generateToken.js";
import sessionSchema from "../models/sessionSchema.js";
import { verifyMail } from "../emailVerify/verifyMail.js";
import orderSchema from "../models/orderSchema.js";
import foodSchema from "../models/foodSchema.js";
import { verifyGoogleToken } from "../services/googleservice.js";

//register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await userSchema.findOne({ email })

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "email already exising..."
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userSchema.create({
            name,
            email,
            password: hashPassword,
        })
        const token = generateRegisterToken(user._id);
        verifyMail(token, email)
        user.token = token;
        await user.save();
        return res.status(201).json({
            success: true,
            message: "user register successfuly",
            user
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!",
            });
        }

        const passwordCheck = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify yourself and then login!",
            });
        }

        if (user.role !== "admin" && user.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Access denied for this role!",
            });
        }

        await sessionSchema.findOneAndDelete({
            userId: user._id
        });

        await sessionSchema.create({
            userId: user._id
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.isLogin = true;
        await user.save();


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false, // production -> true
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//logout
export const logout = async (req, res) => {
    try {

        const existing = await sessionSchema.findOne({
            userId: req.userId
        });

        const user = await userSchema.findById(
            req.userId
        );

        if (existing) {

            // Delete session
            await sessionSchema.findOneAndDelete({
                userId: req.userId
            });

            // Update login status
            user.isLogin = false;
            await user.save();

            // IMPORTANT: clear cookies
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            });

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            });

            return res.status(200).json({
                success: true,
                message: "Session successfully ended",
            });

        } else {

            return res.status(404).json({
                success: false,
                message: "User had no session",
            });

        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

//getProfile
export const getProfile = async (req, res) => {
    try {
        const user = await userSchema.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                success: true,
                message: "user not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Display Profile information",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//deleteProfile
export const deleteProfile = async (req, res) => {
    try {
        await userSchema.findByIdAndDelete(req.userId);
        await sessionSchema.findOneAndDelete({ userId: user.userId });
        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//updateProfile
export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, email },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated",
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//getAllUser
export const getAllUser = async (req, res) => {
    try {
        const loggedInUser = await userSchema.findById(req.userId);

        if (!loggedInUser) {
            return res.status(404).json({
                success: false,
                message: "Logged in user not found"
            });
        }

        if (loggedInUser.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only."
            });
        }

        const users = await userSchema
            .find({ role: "user" })
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//total
export const getTotal = async (req, res) => {
  try {

    const totalUsers = await userSchema.countDocuments({ role: "user" });

    const totalOrders = await orderSchema.countDocuments();

    const totalFoods = await foodSchema.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalFoods,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GoogleLogin
export const googleLogin = async (req, res) => {
    try {

        const { credential } = req.body;
       
        const payload = await verifyGoogleToken( credential );

        const { sub, email, name, email_verified,} = payload;

        let user = await userSchema.findOne({
            email
        });

        if (!user) {
            user = await userSchema.create({
                name,
                email,
                googleId: sub,
                provider: "google",
                isVerified: email_verified,
            });
        }

        await sessionSchema.findOneAndDelete({
            userId: user._id
        });

        await sessionSchema.create({
            userId: user._id
        });

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        user.isLogin = true;

        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message:"Google login success",
            user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}