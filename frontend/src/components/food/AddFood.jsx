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

      // Reset file input manually
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
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">
          Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food Name"
            required
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={3}
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            required
            className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm rounded-md transition"
          >
            {loading ? "Uploading..." : "Add Food"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddFood;
