import { X, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    removeItem,
    updateCartItem,
} from "../../features/cartSlice";
import { useEffect } from "react";

const CartModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const items = cart?.items || [];

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
            <div className="w-full sm:w-80 bg-white h-full shadow-2xl p-5 relative flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Your Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-200 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-gray-500 text-sm">Loading...</p>
                )}

                {/* Empty State */}
                {!loading && items.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-lg font-semibold">
                            No Items Found
                        </p>
                        <p className="text-sm mt-2">
                            Your cart is empty
                        </p>
                    </div>
                )}

                {/* Items */}
                {!loading && items.length > 0 && (
                    <div className="flex-1 overflow-y-auto flex flex-col gap-3">

                        {items.map((item) => {

                            // 🔥 Safety check (very important)
                            if (!item.food) return null;

                            const price = item.food.price;
                            const quantity = item.quantity;
                            const itemTotal = price * quantity;

                            return (
                                <div
                                    key={item._id}
                                    className="border border-gray-200 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                                >
                                    <h3 className="font-medium text-gray-800 text-sm">
                                        {item.food.name}
                                    </h3>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-3">

                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        updateCartItem({
                                                            foodId: item.food._id,
                                                            type: "dec",
                                                        })
                                                    )
                                                }
                                                className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition disabled:opacity-50"
                                                disabled={quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span className="font-semibold text-sm w-6 text-center">
                                                {quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        updateCartItem({
                                                            foodId: item.food._id,
                                                            type: "inc",
                                                        })
                                                    )
                                                }
                                                className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                                            >
                                                <Plus size={14} />
                                            </button>

                                        </div>

                                        <p className="text-sm font-semibold text-indigo-600">
                                            ₹{itemTotal}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() =>
                                            dispatch(removeItem(item.food._id))
                                        }
                                        className="mt-3 w-full text-xs bg-red-500 text-white py-1.5 rounded hover:bg-red-600 transition"
                                    >
                                        Remove Item
                                    </button>

                                </div>
                            );
                        })}

                    </div>
                )}

                {/* Footer */}
                {!loading && items.length > 0 && (
                    <div className="pt-4 border-t mt-4">
                        <div className="mb-3 font-semibold text-base text-gray-700 flex justify-between">
                            <span>Total</span>
                            <span className="text-indigo-600">
                                ₹{cart?.totalPrice || 0}
                            </span>
                        </div>

                        <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition">
                            Checkout
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CartModal;
