import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food"
    }
  ]

}, { timestamps: true });

export default mongoose.model("wishlist", wishlistSchema);
