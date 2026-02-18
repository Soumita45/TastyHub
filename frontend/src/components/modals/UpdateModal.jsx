import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateFood } from "../../features/adminSlice";

const UpdateFoodModal = ({ isOpen, onClose, food }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (food) {
      const formattedData = {
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        foodType: food.foodType,
        ingredients: food.ingredients?.join(", "),
      };

      setFormData(formattedData);
      setOriginalData(formattedData);
    }
  }, [food]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        if (key === "ingredients") {
          data.append(
            "ingredients",
            JSON.stringify(
              formData.ingredients.split(",").map((i) => i.trim())
            )
          );
        } else if (key === "image") {
          data.append("image", formData.image);
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    if ([...data.keys()].length === 0) {
      toast.error("No changes made");
      return;
    }

    try {
      const res = await dispatch(
        updateFood({ id: food._id, data })
      ).unwrap();

      toast.success(res.message || "Updated Successfully");
      onClose();
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-3 z-50">
      
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 max-h-[85vh] overflow-y-auto">

        <h2 className="text-lg font-semibold mb-4 text-center">
          Update Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Food Name"
            className="w-full p-2 text-sm border rounded"
          />

          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full p-2 text-sm border rounded"
          />

          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 text-sm border rounded"
          />

          <input
            type="text"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 text-sm border rounded"
          />

          <select
            name="foodType"
            value={formData.foodType || "veg"}
            onChange={handleChange}
            className="w-full p-2 text-sm border rounded"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <input
            type="text"
            name="ingredients"
            value={formData.ingredients || ""}
            onChange={handleChange}
            placeholder="Ingredients"
            className="w-full p-2 text-sm border rounded"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full text-sm"
          />

          {food?.image && (
            <img
              src={food.image}
              alt="Food"
              className="h-16 mt-2 rounded"
            />
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-red-500 text-white rounded"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateFoodModal;
