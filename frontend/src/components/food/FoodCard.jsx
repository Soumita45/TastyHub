import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const FoodCard = ({ food, onClick }) => {
    const dispatch = useDispatch();


    const items = useSelector(
        (state) => state.cart.cart?.items || []
    );


    const isAlreadyInCart = items.some(
        (item) => item.food?._id === food?._id
    );

    const handleAddToCart = () => {
        if (!food?._id) return;

        if (isAlreadyInCart) {
            return; // duplicate block
        }

        dispatch(
            addToCart({
                foodId: food._id,
                quantity: 1,
            })
        );
    };

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            {/* Image */}
            <div
                className="h-48 overflow-hidden cursor-pointer"
                onClick={onClick}
            >
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">
                    {food.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {food.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="font-bold text-red-500">
                        ₹{food.price}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAlreadyInCart}
                        className={`px-3 py-1 rounded text-sm transition active:scale-95 
            ${isAlreadyInCart
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-red-500 text-white hover:bg-red-600"}`}
                    >
                        {isAlreadyInCart ? "Added" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;