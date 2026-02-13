import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "food"
            },
            quantity: Number
        }
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("order", orderSchema);
