import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, switchToRegister }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handelLogin = async () => {
        try {
            const res = await axios.post(" http://localhost:8000/user/login", { email, password })
            console.log(res)
            const data = res.data;
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem("name", data.user.name)
            localStorage.setItem("email", data.user.email)
            localStorage.setItem("role", data.user.role)
            setTimeout(() => {
                navigate("/sidebar")
            }, 1500);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message)
            } else {
                console.log("Server error")
            }
        }
    }

    return (
        <div>

            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative max-h-[95vh] overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition" >
                        ×
                    </button>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="text-center mb-2">

                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome Back</h3>
                            <p className="text-gray-500 mt-2 text-sm sm:text-base">Sign in to continue</p>
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-sm sm:text-base"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition pr-12 text-sm sm:text-base"
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right mb-5">
                            <button
                                type="button"
                                className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handelLogin}
                            className="w-full bg-red-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>


                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600 mt-2">
                            Don't have an account?{' '}
                            <button onClick={switchToRegister}
                                className="text-red-600 font-semibold hover:text-red-700 hover:underline">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
