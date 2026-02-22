import { Outlet } from "react-router-dom";
import UserSidebar from "../layout/UserSidebar";


const UserLayout = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;