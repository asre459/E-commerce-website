import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
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
      padding: "0 1rem",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #dee2e6",
      border:"b"  },
      button: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "0.25rem",
        cursor: "pointer",
      },
      buttonIcon: {
        marginRight: "0.5rem",
      },


  };

  return (
    <header style={style.header} className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block" style={style.button}>
        <AlignJustify />
        <span className="sr-only" style={style.buttonIcon}>Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
