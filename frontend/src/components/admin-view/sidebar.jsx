import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  X
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
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
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "18px",
            color: "#6b7280",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" style={{ width: "256px" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <SheetHeader style={{ borderBottom: "1px solid #e5e7eb" }}>
              <SheetTitle style={{ display: "flex", gap: "8px", marginTop: "20px", marginBottom: "20px" }}>
                <ChartNoAxesCombined size={30} />
                <h1 style={{ fontSize: "20px", fontWeight: "800" }}>Admin Panel</h1>
              </SheetTitle>
               <X 
                size={24} 
                onClick={() => setOpen(false)} 
                style={{ cursor: "pointer" }}
              />
            </SheetHeader>
            <MenuItems setOpen={setOpen} isMobile={true}  />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          width: "256px",
          borderRight: "1px solid #e5e7eb",
          backgroundColor: "#fff",
          padding: "24px",
        }}
        className="hidden lg:flex"
      >
        <div
          onClick={() => navigate("/admin/dashboard")}
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <ChartNoAxesCombined size={30} />
          <h1 style={{ fontSize: "20px", fontWeight: "800" }}>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
