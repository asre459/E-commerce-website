import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails, onClose }) => {
  const { user } = useSelector((state) => state.auth);
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

  // Safe handling for onClose function
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === 'function') {
      onClose();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27 && typeof onClose === 'function') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const containerStyle = { 
    display: "grid", 
    gap: isMobile ? "16px" : "24px", 
    maxWidth: "600px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    maxHeight: "90vh",
    overflowY: "auto"
  };
  
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "16px" : "20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef"
  };
  
  const contentStyle = {
    padding: isMobile ? "16px" : "20px",
    paddingTop: 0
  };
  
  const rowStyle = { 
    display: "flex", 
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center", 
    justifyContent: "space-between", 
    marginTop: "12px",
    gap: isMobile ? "4px" : "0"
  };
  
  const titleStyle = { 
    fontWeight: 500, 
    fontSize: isMobile ? "14px" : "16px",
    marginBottom: isMobile ? "4px" : "0",
    color: "#495057"
  };
  
  const badgeStyle = (status) => ({
    padding: "4px 12px",
    backgroundColor:
      status === "confirmed" ? "#28a745" :
      status === "rejected" ? "#dc3545" :
      "#6c757d",
    color: "white",
    borderRadius: "20px",
    fontSize: isMobile ? "12px" : "14px",
    fontWeight: 500
  });

  const orderItemStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: isMobile ? "8px" : "16px",
    padding: isMobile ? "12px 0" : "8px 0",
    borderBottom: "1px solid #f0f0f0"
  };

  const separatorStyle = {
    height: "1px",
    backgroundColor: "#e9ecef",
    margin: "16px 0"
  };

  // Safe close function
  const safeClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: isMobile ? "16px" : "24px"
    }} onClick={handleBackdropClick}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{ 
            margin: 0, 
            fontSize: isMobile ? "18px" : "20px",
            color: "#212529"
          }}>
            Order Details
          </h2>
          {typeof onClose === 'function' && (
            <button onClick={safeClose} style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6c757d"
            }}>
              ×
            </button>
          )}
        </div>
        
        <div style={contentStyle}>
          <div style={{ display: "grid", gap: isMobile ? "12px" : "16px" }}>
            <div style={rowStyle}>
              <p style={titleStyle}>Order ID</p>
              <span style={{ fontSize: isMobile ? "13px" : "14px", wordBreak: "break-all", color: "#6c757d" }}>{orderDetails?._id}</span>
            </div>
            <div style={rowStyle}>
              <p style={titleStyle}>Order Date</p>
              <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>
                {orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}
              </span>
            </div>
            <div style={rowStyle}>
              <p style={titleStyle}>Order Price</p>
              <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>${orderDetails?.totalAmount || "0.00"}</span>
            </div>
            <div style={rowStyle}>
              <p style={titleStyle}>Payment method</p>
              <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>{orderDetails?.paymentMethod || "N/A"}</span>
            </div>
            <div style={rowStyle}>
              <p style={titleStyle}>Payment Status</p>
              <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>{orderDetails?.paymentStatus || "N/A"}</span>
            </div>
            <div style={rowStyle}>
              <p style={titleStyle}>Order Status</p>
              <span style={badgeStyle(orderDetails?.orderStatus)}>
                {orderDetails?.orderStatus || "N/A"}
              </span>
            </div>
          </div>

          <div style={separatorStyle}></div>

          <div style={{ display: "grid", gap: isMobile ? "12px" : "16px" }}>
            <div style={{ display: "grid", gap: isMobile ? "8px" : "12px" }}>
              <div style={{ fontWeight: 500, fontSize: isMobile ? "16px" : "18px", color: "#212529" }}>Order Items</div>
              <ul style={{ 
                display: "grid", 
                gap: isMobile ? "12px" : "16px",
                maxHeight: isMobile ? "300px" : "none",
                overflowY: "auto",
                padding: 0,
                margin: 0,
                listStyle: "none"
              }}>
                {orderDetails?.cartItems?.length
                  ? orderDetails.cartItems.map((item, index) => (
                      <li key={index} style={orderItemStyle}>
                        <span style={{ fontWeight: "500", fontSize: isMobile ? "14px" : "16px", color: "#212529" }}>
                          {item.title}
                        </span>
                        <div style={{ 
                          display: "flex", 
                          gap: isMobile ? "12px" : "24px",
                          flexDirection: isMobile ? "row" : "row"
                        }}>
                          <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>Qty: {item.quantity}</span>
                          <span style={{ fontSize: isMobile ? "13px" : "14px", color: "#6c757d" }}>${item.price}</span>
                        </div>
                      </li>
                    ))
                  : <li style={{ textAlign: "center", padding: "16px", color: "#6c757d" }}>No items found</li>}
              </ul>
            </div>
          </div>

          <div style={separatorStyle}></div>

          <div style={{ display: "grid", gap: isMobile ? "12px" : "16px" }}>
            <div style={{ fontWeight: 500, fontSize: isMobile ? "16px" : "18px", color: "#212529" }}>Shipping Information</div>
            <div style={{ 
              display: "grid", 
              gap: isMobile ? "6px" : "8px", 
              color: "#6c757d",
              fontSize: isMobile ? "14px" : "16px"
            }}>
              <span>{user?.userName || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.address || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.city || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.pincode || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.phone || "N/A"}</span>
              {orderDetails?.addressInfo?.notes && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ fontWeight: "500", marginBottom: "4px", color: "#212529" }}>Delivery Notes:</div>
                  <span>{orderDetails.addressInfo.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default props to prevent errors
ShoppingOrderDetailsView.defaultProps = {
  onClose: () => console.warn("onClose function not provided to ShoppingOrderDetailsView"),
  orderDetails: {}
};

export default ShoppingOrderDetailsView;