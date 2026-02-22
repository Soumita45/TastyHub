import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../features/orderSlice";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                Order History
            </h2>

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No Orders Found</p>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                        {/* Date + Payment */}
                        <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
                            <span>
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {order.paymentMethod.toUpperCase()}
                            </span>
                        </div>

                        {/* Items */}
                        <div className="space-y-1 text-sm text-gray-700">
                            {order.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between"
                                >
                                    <span>
                                        {item.food?.name || item.name}
                                    </span>
                                    <span> {item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="flex justify-between mt-3 pt-2 border-t text-sm font-medium">
                            <span>Total</span>
                            <span className="text-indigo-600">
                                ₹{order.totalPrice}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;