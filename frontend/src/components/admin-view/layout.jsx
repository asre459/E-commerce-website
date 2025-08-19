import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <AdminHeader setOpen={setOpenSidebar} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#f3f4f6", padding: "24px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
