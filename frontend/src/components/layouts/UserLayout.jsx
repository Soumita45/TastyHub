import { Outlet } from "react-router-dom";
import UserSidebar from "../layout/UserSidebar";


const UserLayout = () => {
  return (
    <div className="flex ">
      <UserSidebar />
      <div className="flex-1 lg:ml-70 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;