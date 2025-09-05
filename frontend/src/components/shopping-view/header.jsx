import { useState, useEffect } from "react";
import { HousePlug, LogOut, ShoppingCart, UserCog, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems({ isMobile = false, closeMobileMenu = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
    
    if (isMobile) closeMobileMenu();
  }

  return (
    <nav style={{ 
      display: "flex", 
      flexDirection: isMobile ? "column" : "row", 
      gap: isMobile ? "16px" : "20px",
      alignItems: isMobile ? "flex-start" : "center"
    }}>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          style={{
            fontSize: isMobile ? "16px" : "14px",
            fontWeight: "500",
            cursor: "pointer",
            padding: isMobile ? "8px 0" : "0",
          }}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          style={{
            position: "relative",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "6px",
          }}
        >
          <ShoppingCart style={{ width: "20px", height: "20px" }} />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "2px",
              fontWeight: "bold",
              fontSize: "10px",
              color: "red",
            }}
          >
            {cartItems?.items?.length || 0}
          </span>
          <span style={{ display: "none" }}>User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar style={{ background: "black", width: "32px", height: "32px" }}>
            <AvatarFallback
              style={{
                background: "black",
                color: "white",
                fontWeight: "800",
                fontSize: "12px",
              }}
            >
              {user?.userName ? user.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" style={{ width: "200px", marginTop: "10px" }}>
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut style={{ marginRight: "8px", width: "16px", height: "16px" }} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      
      // Close mobile menu when resizing to larger screens
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          height: isMobile ? "56px" : "64px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 20px",
        }}
      >
        {/* Logo and mobile menu button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ padding: "4px", width: "36px", height: "36px" }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          
          <Link
            to="/shop/home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <HousePlug style={{ width: isMobile ? "20px" : "24px", height: isMobile ? "20px" : "24px" }} />
            <span style={{ 
              fontWeight: "bold", 
              fontSize: isMobile ? "14px" : "16px", 
              color: "#000" 
            }}>
              Ecommerce
            </span>
          </Link>
        </div>

        {/* Desktop/Tablet Menu */}
        {!isMobile && (
          <div style={{ 
            display: "flex", 
            gap: isTablet ? "12px" : "20px",
            marginLeft: isTablet ? "12px" : "0"
          }}>
            <MenuItems />
          </div>
        )}

        {/* Right content */}
        <div style={{ display: "flex" }}>
          <HeaderRightContent />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "75%",
              height: "100%",
              backgroundColor: "white",
              padding: "24px 20px",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItems isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

export default ShoppingHeader;