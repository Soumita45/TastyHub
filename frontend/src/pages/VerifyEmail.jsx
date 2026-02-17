import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
    const [status, setStatus] = useState("verifying");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!token) {
                    setStatus("expired");
                    setError("Invalid verification link.");
                    return;
                }
                const res = await axios.get(
                    "http://localhost:8000/user/verify",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (res.data.success) {
                    setStatus("success");

                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    setStatus("expired");
                    setError(res.data.message);
                }

            } catch (err) {
                setStatus("expired");
                setError(
                    err.response?.data?.message || "Verification link expired."
                );
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

                {status === "verifying" && (
                    <h1 className="text-xl font-semibold text-gray-600">
                        Verifying your email...
                    </h1>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600">
                            Email Verified Successfully
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Redirecting to home page...
                        </p>
                    </>
                )}

                {status === "expired" && (
                    <>
                        <h1 className="text-2xl font-semibold text-red-500">
                            Verification Failed
                        </h1>
                        <p className="text-gray-600 mt-2">{error}</p>
                    </>
                )}

            </div>
        </div>
    );
};

export default VerifyEmail;
