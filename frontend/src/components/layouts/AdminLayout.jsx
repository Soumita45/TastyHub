import { Outlet } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar";


const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-72 p-6 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;