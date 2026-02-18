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
    <div className="p-3 sm:p-6 bg-gray-50 h-full flex flex-col">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-6 shrink-0">
        All Orders
      </h2>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      <div className="hidden md:block flex-1 bg-white rounded-lg shadow border overflow-hidden">

        {/* Scrollable Wrapper */}
        <div className="h-full overflow-y-auto">

          <table className="w-full border-collapse">

            <thead className="bg-gray-100 text-sm sticky top-0 z-10">
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
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* User */}
                  <td className="border p-3">
                    <div className="font-medium">
                      {order.user?.name}
                    </div>
                    <div className="text-xs text-gray-500 break-all">
                      {order.user?.email}
                    </div>
                  </td>

                  {/* Items */}
                  <td className="border p-3">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.food?.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  {/* Total */}
                  <td className="border p-3 text-center font-medium">
                    ₹{order.totalPrice}
                  </td>

                  {/* Status */}
                  <td className="border p-3 text-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {order.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="border p-3 text-center text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default AllOrder;
