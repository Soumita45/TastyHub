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
            unique: true,
        },

        password: {
            type: String,
        },

        googleId: {
            type: String,
            default: null,
        },

        provider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        isLogin: {
            type: Boolean,
            default: false,
        },

        token: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("user", userSchema);