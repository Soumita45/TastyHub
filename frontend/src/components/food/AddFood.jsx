import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addFood } from "../../features/adminSlice";

const AddFood = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    foodType: "veg",
    ingredients: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Image is required");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", Number(formData.price));
    data.append("category", formData.category);
    data.append("foodType", formData.foodType);


    data.append(
      "ingredients",
      JSON.stringify(
        formData.ingredients.split(",").map((item) => item.trim())
      )
    );

    data.append("image", formData.image);

    try {
      const response = await dispatch(addFood(data)).unwrap();

      toast.success(response.message || "Food added successfully");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        foodType: "veg",
        ingredients: "",
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        navigate(-1);
      }, 1000);

    } catch (errorMessage) {
      toast.error(errorMessage || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center px-4 py-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food Name"
            required
            className="p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={2}
            className="md:col-span-2 p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            required
            className="md:col-span-2 p-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="md:col-span-2 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1  text-sm rounded-md transition"
          >
            {loading ? "Uploading..." : "Add Food"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddFood;
