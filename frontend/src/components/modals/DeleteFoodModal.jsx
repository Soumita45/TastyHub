import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFoods } from "../../features/adminSlice";
import { Trash2 } from "lucide-react";

const DeleteFoodModal = ({ foodId, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      const resultAction = await dispatch(deleteFoods(foodId));

      if (deleteFoods.fulfilled.match(resultAction)) {
        onClose(); // success হলে modal বন্ধ
      } else {
        setError(
          resultAction.payload?.message || "Failed to delete food"
        );
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-3">

        {/* Icon */}
        <div className="flex justify-center mb-4">
         
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">
          Delete Food
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-4">
          Are you sure you want to delete this item?
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteFoodModal;