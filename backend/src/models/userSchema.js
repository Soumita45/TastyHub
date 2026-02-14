import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isLogin: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            default: null
        },
    }, { timestamps: true });

export default mongoose.model("user", userSchema);
