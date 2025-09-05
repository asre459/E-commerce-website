import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  X,
  Menu
} from "lucide-react";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={20} />,
  },
];

function MenuItems({ setOpen, isMobile }) {
  const navigate = useNavigate();

  return (
    <nav style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: isMobile ? "14px 16px" : "12px 14px",
            borderRadius: "8px",
            fontSize: isMobile ? "18px" : "16px",
            color: "#4B5563",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "#2367f0";
              e.currentTarget.style.color = "white";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#4B5563";
            }
          }}
          onTouchStart={(e) => {
            if (isMobile) {
              e.currentTarget.style.backgroundColor = "#2367f0";
              e.currentTarget.style.color = "white";
            }
          }}
          onTouchEnd={(e) => {
            if (isMobile) {
              setTimeout(() => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#4B5563";
              }, 300);
            }
          }}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Fragment>
      {/* Mobile menu button - shown only on mobile */}
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            top: "16px",
            left: "16px",
            zIndex: 40,
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: "#2367f0",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile sidebar/drawer */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: open ? 0 : "-100%",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 50,
            transition: "left 0.3s ease",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              width: "80%",
              maxWidth: "320px",
              height: "100%",
              backgroundColor: "white",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <div
                onClick={() => navigate("/admin/dashboard")}
                style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              >
                <ChartNoAxesCombined size={30} />
                <h1 style={{ fontSize: "20px", fontWeight: "800" }}>Admin Panel</h1>
              </div>
              <X 
                size={24} 
                onClick={() => setOpen(false)} 
                style={{ cursor: "pointer", color: "#4B5563" }}
              />
            </div>
            <MenuItems setOpen={setOpen} isMobile={true} />
          </div>
        </div>
      )}

      {/* Tablet sidebar - slightly narrower */}
      {isTablet && (
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            width: "220px",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
            padding: "20px",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <div
            onClick={() => navigate("/admin/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginBottom: "24px" }}
          >
            <ChartNoAxesCombined size={28} />
            <h1 style={{ fontSize: "18px", fontWeight: "800" }}>Admin Panel</h1>
          </div>
          <MenuItems isMobile={false} />
        </aside>
      )}

      {/* Desktop sidebar - full width */}
      {!isMobile && !isTablet && (
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            width: "256px",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
            padding: "24px",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <div
            onClick={() => navigate("/admin/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginBottom: "32px" }}
          >
            <ChartNoAxesCombined size={30} />
            <h1 style={{ fontSize: "20px", fontWeight: "800" }}>Admin Panel</h1>
          </div>
          <MenuItems isMobile={false} />
        </aside>
      )}
    </Fragment>
  );
}

export default AdminSideBar;