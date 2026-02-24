import { Outlet } from "react-router-dom";
import UserSidebar from "../layout/UserSidebar";


const UserLayout = () => {
  return (
    <div className="flex ">
      <UserSidebar />
      <div className="flex-1 lg:ml-72 p-6 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;