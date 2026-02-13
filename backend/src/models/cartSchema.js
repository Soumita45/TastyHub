import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  totalPrice: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("cart", cartSchema);
