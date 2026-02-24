import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkoutOrder } from "../../features/orderSlice";
import { fetchCart } from "../../features/cartSlice";
import { Check, X } from "lucide-react";

const PaymentModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [success, setSuccess] = useState(false);

    const handleConfirm = () => {
        if (!paymentMethod) return alert("Select Payment Method");

        dispatch(checkoutOrder(paymentMethod))
            .unwrap()
            .then(() => {
                setSuccess(true);

                setTimeout(() => {
                    dispatch(fetchCart());
                    onClose();
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                alert(err?.message || "Something went wrong");
            });
    };

    return (
        <div className="absolute inset-0 bg-white p-6 flex flex-col justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
                <X size={22} />
            </button>
            {!success ? (
                <>
                    <h2 className="text-lg font-semibold mb-4 text-center">
                        Select Payment Method
                    </h2>

                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border p-2 rounded mb-4"
                    >
                        <option value="">Select Method</option>
                        <option value="upi">UPI</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="card">Debit / Credit Card</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>

                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Confirm Order
                    </button>
                </>
            ) : (
                <div className="text-center">
                    <div className="flex justify-center text-green-600 text-4xl mb-3">
                        <Check />
                    </div>

                    <h2 className="text-lg font-semibold text-green-600">
                        Payment Successful!
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Your order has been placed successfully.
                    </p>
                </div>
            )}

        </div>
    );
};

export default PaymentModal;