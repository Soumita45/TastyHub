import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { getAllUsers } from "../../features/adminSlice";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 h-full flex flex-col">

      {/* Title (Fixed) */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 shrink-0">
        Manage Users
      </h2>

      {loading && (
        <p className="text-blue-500 font-medium mb-4">
          Loading users...
        </p>
      )}

      {error && (
        <p className="text-red-500 font-medium mb-4">
          {error}
        </p>
      )}

      {/* Scrollable User List */}
      <div
        className="
          bg-white 
          rounded-xl 
          shadow-md 
          divide-y
          overflow-y-auto
          max-h-[65vh]   /* Responsive height */
        "
      >

        {users?.map((user) => (
          <div
            key={user._id}
            className="
              flex 
              flex-col sm:flex-row 
              sm:items-center 
              sm:justify-between 
              gap-3 
              px-4 sm:px-6 
              py-4 
              hover:bg-gray-50 
              transition
            "
          >
            {/* User Info */}
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-800 truncate">
                {user.name}
              </h4>
              <p className="text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>

            
          </div>
        ))}

        {users.length === 0 && !loading && (
          <p className="p-6 text-center text-gray-500">
            No users found
          </p>
        )}

      </div>

    </div>
  );
};

export default ManageUser;
