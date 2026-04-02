import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import dotenv from "dotenv/config"

const API = process.env.REACT_APP_API_URL;

const Register = ({ onClose, switchToLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);

            const res = await axios.post(
                `${API}/user/register`,
                { name, email, password }
            );

            if (res.data.success) {
                toast.success(res.data.message || "Registration Successful");

                onClose();

                setTimeout(() => {
                    switchToLogin();
                }, 800);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

                <div className="p-6">

                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Create Account
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">
                            Sign up to get started
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    />

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <button
                            onClick={switchToLogin}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Sign in
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;