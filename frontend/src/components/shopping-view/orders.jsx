import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";

function ShoppingOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  const handleViewOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId)).then(() => {
      setShowOrderDetails(true);
    });
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
    dispatch(resetOrderDetails());
  };

  function getBadgeStyle(status) {
    let bgColor = "#000000";
    if (status === "confirmed") bgColor = "#22C55E"; // green
    else if (status === "rejected") bgColor = "#DC2626"; // red
    
    return {
      backgroundColor: bgColor,
      color: "#FFFFFF",
      padding: "4px 12px",
      borderRadius: "9999px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "12px",
      fontWeight: "500",
    };
  }

  // Responsive styles
  const cardStyle = {
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    padding: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const cardHeaderStyle = {
    marginBottom: "16px",
  };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #E5E7EB",
    fontWeight: "600",
    fontSize: "14px",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #E5E7EB",
    fontSize: "14px",
  };

  // Mobile responsive styles
  const mobileCardStyle = {
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={cardTitleStyle}>Order History</h2>
      </div>
      
      {/* Desktop Table View */}
      <div style={{ overflowX: "auto", display: window.innerWidth > 768 ? "block" : "none" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Order Date</th>
              <th style={thStyle}>Order Status</th>
              <th style={thStyle}>Order Price</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <tr key={orderItem?._id}>
                  <td style={tdStyle}>{orderItem?._id?.substring(0, 8)}...</td>
                  <td style={tdStyle}>{orderItem?.orderDate?.split("T")[0] || "N/A"}</td>
                  <td style={tdStyle}>
                    <span style={getBadgeStyle(orderItem?.orderStatus)}>
                      {orderItem?.orderStatus}
                    </span>
                  </td>
                  <td style={tdStyle}>${orderItem?.totalAmount || "0.00"}</td>
                  <td style={tdStyle}>
                    <Button
                      style={{ 
                        backgroundColor: "#3B82F6", 
                        color: "#FFFFFF",
                        padding: "8px 16px",
                        fontSize: "14px"
                      }}
                      onClick={() => handleViewOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={tdStyle} colSpan={5}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div style={{ display: window.innerWidth <= 768 ? "block" : "none" }}>
        {orderList && orderList.length > 0 ? (
          orderList.map((orderItem) => (
            <div key={orderItem?._id} style={mobileCardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontWeight: "600" }}>Order ID:</div>
                <div>{orderItem?._id?.substring(0, 8)}...</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontWeight: "600" }}>Date:</div>
                <div>{orderItem?.orderDate?.split("T")[0] || "N/A"}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontWeight: "600" }}>Status:</div>
                <div>
                  <span style={getBadgeStyle(orderItem?.orderStatus)}>
                    {orderItem?.orderStatus}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontWeight: "600" }}>Price:</div>
                <div>${orderItem?.totalAmount || "0.00"}</div>
              </div>
              <Button
                style={{ 
                  backgroundColor: "#3B82F6", 
                  color: "#FFFFFF",
                  width: "100%",
                  padding: "8px 16px"
                }}
                onClick={() => handleViewOrderDetails(orderItem?._id)}
              >
                View Details
              </Button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "24px" }}>No orders found.</div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {showOrderDetails && orderDetails && (
        <ShoppingOrderDetailsView 
          orderDetails={orderDetails} 
          onClose={handleCloseOrderDetails}
        />
      )}
    </div>
  );
}

export default ShoppingOrders;