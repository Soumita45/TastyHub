import { Outlet } from "react-router-dom";
import UserSidebar from "../layout/UserSidebar";
import Footer from "../layout/Footer";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <div className="flex flex-col flex-1 lg:ml-72">
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;