import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  const style = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "16px 24px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #dee2e6",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    logoutButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 18px",
      backgroundColor: "#dc3545",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.2s ease",
    },
  };

  return (
    <header style={style.header}>
      <button 
        onClick={handleLogout} 
        style={style.logoutButton}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#bd2130";
          e.target.style.transform = "translateY(-1px)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#dc3545";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}

export default AdminHeader;