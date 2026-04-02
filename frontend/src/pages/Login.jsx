import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSchema } from "../components/validation/validation";

// Google Login import
import { GoogleLogin } from "@react-oauth/google";



const API = import.meta.env.VITE_API_URL;

const Login = ({ onClose, switchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // NORMAL LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginSchema.validate(
                { email, password },
                { abortEarly: false }
            );

            setLoading(true);

            const res = await axios.post(
                `${API}/user/login`,
                { email, password },
                {
                    withCredentials: true
                }
            );

            const data = res.data;

            localStorage.setItem(
                "name",
                data.user.name
            );

            localStorage.setItem(
                "email",
                data.user.email
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            toast.success(
                data.message ||
                "Login successful"
            );

            const role = data.user.role;

            if (onClose) onClose();

            setTimeout(() => {
                if (role === "admin") {
                    navigate(
                        "/admin/dashboard",
                        { replace: true }
                    );
                } else {
                    navigate(
                        "/menu",
                        { replace: true }
                    );
                }
            }, 1000);

        } catch (error) {

            if (error.name === "ValidationError") {
                error.inner.forEach((err) => {
                    toast.error(err.message);
                });
            }

            else if (error.response) {
                toast.error(
                    error.response.data.message
                    || "Login failed"
                );
            }

            else {
                toast.error(
                    "Server error, please try again"
                );
            }

        } finally {
            setLoading(false);
        }
    };
    // GOOGLE LOGIN
    const handleGoogleSuccess = async (response) => {
        try {
            setLoading(true);

            const res = await axios.post(
                `${API}/user/googleLogin`,
                {
                    credential:
                        response.credential
                },
                {
                    withCredentials: true
                }
            );

            const data = res.data;

            localStorage.setItem(
                "name",
                data.user.name
            );

            localStorage.setItem(
                "email",
                data.user.email
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            toast.success(
                data.message ||
                "Google login successful"
            );

            const role = data.user.role;

            if (onClose) onClose();

            setTimeout(() => {
                if (role === "admin") {
                    navigate(
                        "/admin/dashboard",
                        { replace: true }
                    );
                } else {
                    navigate(
                        "/menu",
                        { replace: true }
                    );
                }
            }, 1000);

        } catch (error) {

            if (error.response) {
                toast.error(
                    error.response.data.message
                    || "Google login failed"
                );
            }

            else {
                toast.error(
                    "Server error, please try again"
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 text-2xl"
                >
                    ×
                </button>

                <div className="p-6">
                    <h3 className="text-2xl font-bold text-center mb-4">
                        Welcome Back
                    </h3>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-3 p-3 border rounded"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 p-3 border rounded"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white p-3 rounded"
                        >
                            {loading
                                ? "Logging in..."
                                : "Sign In"}
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-2 text-gray-500 text-sm">
                            OR
                        </span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() =>
                                toast.error(
                                    "Google login failed"
                                )
                            }
                        />
                    </div>

                    <p className="text-center mt-3 text-sm">
                        Don't have an account?{" "}
                        <button
                            onClick={switchToRegister}
                            className="text-red-600 font-semibold"
                        >
                            Sign up
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;