import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import AddFood from "./components/food/AddFood"
import FoodDetails from "./components/food/FoodDetails";

import UserFoods from "./pages/UserFood";
import Profile from "./pages/Profile";
import MyOrders from "./components/food/MyOrder";

import AdminDashboard from "./components/section/AdminDashboard";
import ManageUser from "./components/section/ManageUser";
import AllOrder from "./components/food/AllOrder";
import Foods from "./components/food/Foods";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes (No Sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />

        {/* USER LAYOUT ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/menu" element={<UserFoods />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/food/:id" element={<FoodDetails />} />
        </Route>

        {/* ADMIN LAYOUT ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="orders" element={<AllOrder />} />
          <Route path="add-food" element={<Foods />} />
          <Route path="addFood" element={<AddFood />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;