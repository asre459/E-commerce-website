import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  const style = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #dee2e6",
    },
    menuButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      backgroundColor: "#007bff",
      color: "black",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
      fontSize: "14px",
    },
    logoutButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      backgroundColor: "#dc3545",
      color: "black",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  };

  return (
    <header style={style.header}>
      <button onClick={() => setOpen(true)} style={style.menuButton}>
        <AlignJustify />
        <span style={{ fontSize: "0px" }}>Toggle Menu</span>
      </button>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleLogout} style={style.logoutButton}>
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
