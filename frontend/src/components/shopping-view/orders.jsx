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
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

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
    };
  }

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
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #E5E7EB",
  };

  const dialogStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 1000,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 999,
  };

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={cardTitleStyle}>Order History</h2>
      </div>
      <div style={{ overflowX: "auto" }}>
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
                  <td style={tdStyle}>{orderItem?._id}</td>
                  <td style={tdStyle}>{orderItem?.orderDate.split("T")[0]}</td>
                  <td style={tdStyle}>
                    <span style={getBadgeStyle(orderItem?.orderStatus)}>
                      {orderItem?.orderStatus}
                    </span>
                  </td>
                  <td style={tdStyle}>${orderItem?.totalAmount}</td>
                  <td style={tdStyle}>
                    <Button
                      style={{ backgroundColor: "#3B82F6", color: "#FFFFFF" }}
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                    {openDetailsDialog && orderDetails && (
                      <>
                        <div style={overlayStyle} onClick={() => { setOpenDetailsDialog(false); dispatch(resetOrderDetails()); }}></div>
                        <div style={dialogStyle}>
                          <ShoppingOrderDetailsView order={orderDetails} />
                          <Button
                            style={{
                              marginTop: "16px",
                              backgroundColor: "#3B82F6",
                              color: "#FFFFFF",
                              width: "100%",
                            }}
                            onClick={() => { setOpenDetailsDialog(false); dispatch(resetOrderDetails()); }}
                          >
                            Close
                          </Button>
                        </div>
                      </>
                    )}
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
    </div>
  );
}

export default ShoppingOrders;
