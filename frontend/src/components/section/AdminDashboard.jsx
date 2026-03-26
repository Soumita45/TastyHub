import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../features/adminSlice";
import { ListOrdered, Soup, User } from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { totalUsers, totalOrders, totalFoods } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());

  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ====== STATS CARDS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h3 className="text-lg flex gap-1"><User />Total Users</h3>
          <p className="text-2xl font-bold"> {totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h3 className="text-lg flex gap-1"><ListOrdered />Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded shadow">
          <h3 className="text-lg flex gap-1"> <Soup />Total Foods</h3>
          <p className="text-2xl font-bold"> {totalFoods}</p>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;
