import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser } from "../features/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleDelete = async () => {
  try {
    await dispatch(deleteUser()).unwrap();
    
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/");

  } catch (error) {
    console.log(error);
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">

        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 text-center">
          Profile
        </h2>

        {user && (
          <>
            <div className="mb-6 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-base sm:text-lg font-medium text-gray-800 break-words">
                  {user.name}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm sm:text-base text-gray-700 break-words">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;