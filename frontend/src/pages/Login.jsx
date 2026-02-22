import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, switchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/user/login",
                { email, password }
            );

            const data = res.data;

            // ✅ Save Data
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("role", data.user.role);

            const role = data.user.role;

            // Close modal
            if (onClose) onClose();

            // 🔥 Role Based Redirect
            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/menu", { replace: true });
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server error");
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
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 p-3 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white p-3 rounded"
                        >
                            {loading ? "Logging in..." : "Sign In"}
                        </button>
                    </form>

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