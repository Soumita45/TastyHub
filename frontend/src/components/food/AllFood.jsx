import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods } from "../../features/adminSlice";
import UpdateFoodModal from "../modals/UpdateModal";
import DeleteFoodModal from "../modals/DeleteFoodModal";

const AllFood = () => {
    const dispatch = useDispatch();

    const { foods, totalPages, loading, error } = useSelector(
        (state) => state.admin
    );

    const [search, setSearch] = useState("");
    const [foodType, setFoodType] = useState("");
    const [page, setPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {
        dispatch(getAllFoods({ page, search, foodType }));
    }, [dispatch, page, search, foodType]);

    const [deleteId, setDeleteId] = useState(null);

    const handleUpdate = (food) => {
        setSelectedFood(food);
        setIsModalOpen(true);
    };

    return (
        <div className="p-2 sm:p-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Manage Foods
                    </h2>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search food..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded text-sm"
                    />



                    <select
                        value={foodType}
                        onChange={(e) => {
                            setFoodType(e.target.value);
                            setPage(1);
                        }}
                        className="border p-2 rounded text-sm"
                    >
                        <option value="">All Type</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                    </select>
                </div>

                {/* Loading & Error */}
                {loading && (
                    <p className="text-blue-500 text-sm mb-3">Loading foods...</p>
                )}

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {/*  Mobile View  */}
                <div className="grid gap-3 md:hidden">
                    {foods?.length > 0 ? (
                        foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-white rounded shadow-sm p-3 border"
                            >
                                <div className="flex gap-3">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">
                                            {food.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {food.category}
                                        </p>
                                        <p className="text-xs capitalize">
                                            {food.foodType}
                                        </p>
                                        <p className="font-medium text-sm mt-1">
                                            ₹ {food.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => handleUpdate(food)}
                                        className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => setDeleteId(food._id)}
                                        className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && (
                            <p className="text-center text-gray-500 text-sm">
                                No foods found
                            </p>
                        )
                    )}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto bg-white rounded shadow-sm">

                    <table className="w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Image</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Type</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {foods?.length > 0 ? (
                                foods.map((food) => (
                                    <tr
                                        key={food._id}
                                        className="text-center hover:bg-gray-50"
                                    >
                                        <td className="p-2 border">
                                            <img
                                                src={food.image}
                                                alt={food.name}
                                                className="w-12 h-12 object-cover mx-auto rounded"
                                            />
                                        </td>

                                        <td className="p-2 border">{food.name}</td>
                                        <td className="p-2 border">{food.category}</td>
                                        <td className="p-2 border">₹ {food.price}</td>
                                        <td className="p-2 border capitalize">
                                            {food.foodType}
                                        </td>

                                        <td className="p-2 border">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleUpdate(food)}
                                                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                                                >
                                                    Update
                                                </button>

                                                <button
                                                    onClick={() => setDeleteId(food._id)}
                                                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !loading && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-3 text-center text-gray-500"
                                        >
                                            No foods found
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination*/}
                <div className="flex justify-center items-center mt-4 gap-2 text-sm">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span>
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

                {/* Update Modal */}
                <UpdateFoodModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    food={selectedFood}
                />
                {deleteId && (<DeleteFoodModal foodId={deleteId}
                    onClose={() => setDeleteId(null)} />)}
            </div>
        </div>
    );
};

export default AllFood;
