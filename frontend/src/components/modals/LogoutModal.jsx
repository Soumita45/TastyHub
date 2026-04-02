import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const LogoutModal = ({ onCancle }) => {

    const navigate = useNavigate();

    const handelLogout = async () => {
        try {

            const res = await axios.delete(
                `${API}/user/logout`,
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                localStorage.removeItem("name");
                localStorage.removeItem("email");
                localStorage.removeItem("role");

                navigate("/");

            }

        } catch (error) {

            console.error(
                "Logout Error:",
                error.response?.data
                || error.message
            );

        }
    };

    return (
        <div>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-red-100 animate-fadeIn">

                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                            Logout
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Are you sure you would like to do this?
                        </p>
                    </div>

                    <div className="border-t border-red-100"></div>

                    <div className="p-4 flex gap-3">

                        <button
                            onClick={onCancle}
                            className="flex-1 py-2.5 rounded-lg font-medium text-gray-700 
                            bg-gray-100 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handelLogout}
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white 
                            bg-gradient-to-r from-red-500 to-red-600 
                            hover:from-red-600 hover:to-red-700 
                            shadow-md hover:shadow-lg transition"
                        >
                            Confirm
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LogoutModal;