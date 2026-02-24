import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FoodCard from "../components/food/FoodCard";
import { getAllFoods } from "../features/adminSlice";

const UserFoods = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { foods = [], loading, totalPages = 1 } = useSelector(
        (state) => state.admin
    );

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [foodType, setFoodType] = useState("");

    useEffect(() => {
        dispatch(getAllFoods({ page, search, foodType }));
    }, [dispatch, page, search, foodType]);

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* 🔍 Search + Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search food..."
                    className="border px-3 py-2 rounded w-60"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />

                {/* Food Type */}
                <select
                    className="border px-3 py-2 rounded"
                    value={foodType}
                    onChange={(e) => {
                        setPage(1);
                        setFoodType(e.target.value);
                    }}
                >
                    <option value="">All Type</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                </select>

            </div>

            {/* ⏳ Loading */}
            {loading && <p className="text-center">Loading foods...</p>}

            {/* 🍽 Empty */}
            {!loading && foods.length === 0 && (
                <p className="text-center text-gray-500">No foods found</p>
            )}

            {/* 🍽 Food Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {foods.map((food) => (
                    <FoodCard
                        key={food._id}
                        food={food}
                        onClick={() => navigate(`/food/${food._id}`)}
                    />
                ))}
            </div>

            {/* 📄 Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">

                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded ${
                            page === 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded ${
                            page === totalPages
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                        Next
                    </button>

                </div>
            )}
        </div>
    );
};

export default UserFoods;