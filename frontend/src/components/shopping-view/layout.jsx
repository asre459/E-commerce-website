import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* common header */}
      <ShoppingHeader />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 1,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
