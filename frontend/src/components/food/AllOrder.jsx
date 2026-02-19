import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/adminSlice";

const AllOrder = () => {
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen flex flex-col">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        All Orders
      </h2>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border p-3 text-left">User</th>
                <th className="border p-3 text-left">Items</th>
                <th className="border p-3 text-center">Total</th>
                <th className="border p-3 text-center">Status</th>
                <th className="border p-3 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">
                    <div className="font-medium">
                      {order.user?.name}
                    </div>
                    <div className="text-xs text-gray-500 break-all">
                      {order.user?.email}
                    </div>
                  </td>

                  <td className="border p-3">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.food?.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="border p-3 text-center font-medium">
                    ₹{order.totalPrice}
                  </td>

                  <td className="border p-3 text-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {order.status}
                    </span>
                  </td>

                  <td className="border p-3 text-center text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow border p-4 space-y-3"
          >
            {/* User */}
            <div>
              <p className="font-semibold">{order.user?.name}</p>
              <p className="text-xs text-gray-500 break-all">
                {order.user?.email}
              </p>
            </div>

            {/* Items */}
            <div className="text-sm">
              <p className="font-medium mb-1">Items:</p>
              {order.items.map((item, index) => (
                <div key={index}>
                  {item.food?.name} × {item.quantity}
                </div>
              ))}
            </div>

            {/* Total + Status */}
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">
                ₹{order.totalPrice}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                {order.status}
              </span>
            </div>

            {/* Date */}
            <div className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllOrder;
