import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function AuthLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Left side - Will be hidden on mobile, full width on tablet */}
      <div
        style={{
          display: isMobile ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: isTablet ? "40%" : "50%",
          overflow: "hidden",
          padding: isTablet ? "40px" : "60px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#f5f5f5",
            padding: isTablet ? "32px" : "48px",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              maxWidth: "600px",
              textAlign: "center",
              color: "#000",
              fontSize: isTablet ? "24px" : "28px",
              fontWeight: "bold",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>

      {/* Right side - Full width on mobile, adjusted on tablet */}
      <div
        style={{
          flex: isMobile ? "none" : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: isMobile ? "24px" : isTablet ? "32px" : "48px",
          width: isMobile ? "100%" : isTablet ? "60%" : "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;