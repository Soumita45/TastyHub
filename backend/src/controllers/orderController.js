import cartSchema from "../models/cartSchema.js";
import orderSchema from "../models/orderSchema.js";

export const checkout = async (req, res) => {
    try {
        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user can checkout"
            });
        }
        const { paymentMethod } = req.body;
        if (!paymentMethod) {
            return res.status(400).json({
                message: "Please select payment method"
            });
        }
        const cart = await cartSchema
            .findOne({ user: req.userId })
            .populate("items.food");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        const order = await orderSchema.create({
            paymentMethod: paymentMethod,
            user: req.userId,
            items: cart.items,
            totalPrice: cart.totalPrice,

            status: "confirmed"
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {

        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user allowed"
            });
        }

        const orders = await orderSchema
            .find({ user: req.userId })
            .populate("items.food")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {

        if (req.role !== "admin") {
            return res.status(403).json({
                message: "Only admin allowed"
            });
        }

        const orders = await orderSchema
            .find()
            .populate("user", "name email")
            .populate("items.food")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
