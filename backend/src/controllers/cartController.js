import cartSchema from "../models/cartSchema.js";
import foodSchema from "../models/foodSchema.js";
import orderSchema from "../models/orderSchema.js";

export const addToCart = async (req, res) => {
    try {

        if (req.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Only user can access cart"
            });
        }

        const { foodId, quantity } = req.body;

        const food = await foodSchema.findById(foodId);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        let cart = await cartSchema.findOne({ user: req.userId });

        if (!cart) {
            cart = await cartSchema.create({
                user: req.userId,
                items: [],
                totalPrice: 0
            });
        }

        const existingItem = cart.items.find(
            item => item.food.toString() === foodId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                food: foodId,
                quantity
            });
        }
        let total = 0;

        for (let item of cart.items) {
            const foodData = await foodSchema.findById(item.food);
            total += foodData.price * item.quantity;
        }

        cart.totalPrice = total;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Food added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCart = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user allowed"
            });
        }

        const { foodId, type } = req.body;

        const cart = await cartSchema.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.food.toString() === foodId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (type === "inc") {
            item.quantity += 1;
        }

        if (type === "dec") {

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                return res.status(400).json({
                    message: "Quantity cannot be less than 1"
                });
            }
        }

        let total = 0;

        for (let i of cart.items) {
            const food = await foodSchema.findById(i.food);
            total += food.price * i.quantity;
        }

        cart.totalPrice = total;

        await cart.save();

        res.status(200).json({
            message: "Cart updated",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user can view cart"
            });
        }

        const cart = await cartSchema.findOne({ user: req.userId })
            .populate("items.food");

        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




export const removeCartItem = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user allowed"
            });
        }

        const { foodId } = req.body;

        const cart = await cartSchema.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.food.toString() !== foodId
        );

        let total = 0;

        for (let item of cart.items) {
            const food = await foodSchema.findById(item.food);
            total += food.price * item.quantity;
        }

        cart.totalPrice = total;

        await cart.save();

        // 🔥 VERY IMPORTANT
        await cart.populate("items.food");

        res.status(200).json({
            message: "Item removed successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

