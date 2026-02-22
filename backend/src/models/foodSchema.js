import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        enum: ["veg", "non-veg"],
        required: true
    },
     ingredients: {
      type: [String],  
      default: []
    },

    image: {
        type: String,
        default:null
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
);

export default mongoose.model("food", foodSchema);
