import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleFood } from "../../features/userSlice";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleFood, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getSingleFood(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        {error}
      </div>
    );

  if (!singleFood)
    return (
      <div className="p-10 text-center font-medium">
        Food not found
      </div>
    );

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto">

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-10 p-6 md:p-10">

          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={singleFood.image}
              alt={singleFood.name}
              className="w-full max-h-[450px] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between space-y-6">

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {singleFood.name}
              </h1>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span>Category: {singleFood.category}</span>
                <span>Type: {singleFood.foodType}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-semibold text-red-500">
              ₹{singleFood.price}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {singleFood.description}
              </p>
            </div>

            {/* Ingredients */}
            {singleFood.ingredients && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Ingredients
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {Array.isArray(singleFood.ingredients)
                    ? singleFood.ingredients.join(", ")
                    : singleFood.ingredients}
                </p>
              </div>
            )}

            {/* Button */}
            <button className="w-full md:w-fit bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600 transition duration-300 shadow-md">
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
