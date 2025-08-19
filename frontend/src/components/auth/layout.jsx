import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Left side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "50%",
          overflow: "hidden",
          padding: "60px",
          color: "white",
          textAlign: "center",
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
            backgroundColor: "#f5f5f5", // you can replace with your "background"
            padding: "48px",
          }}
        >
          <h1
            style={{
              maxWidth: "600px",
              textAlign: "center",
              color: "#000", // replace with your "primary-foreground"
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5", // replace with your theme background
          padding: "48px",
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
