import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const containerStyle = { display: "grid", gap: "24px", maxWidth: "600px" };
  const rowStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" };
  const titleStyle = { fontWeight: 500 };
  const badgeStyle = (status) => ({
    padding: "4px 12px",
    backgroundColor:
      status === "confirmed" ? "green" :
      status === "rejected" ? "red" :
      "black",
    color: "white",
    borderRadius: "4px",
  });

  return (
    <DialogContent style={containerStyle}>
      <div style={{ display: "grid", gap: "8px" }}>
        <div style={rowStyle}>
          <p style={titleStyle}>Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>
        <div style={rowStyle}>
          <p style={titleStyle}>Order Date</p>
          <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
        </div>
        <div style={rowStyle}>
          <p style={titleStyle}>Order Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>
        <div style={rowStyle}>
          <p style={titleStyle}>Payment method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div style={rowStyle}>
          <p style={titleStyle}>Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>
        <div style={rowStyle}>
          <p style={titleStyle}>Order Status</p>
          <Label>
            <Badge style={badgeStyle(orderDetails?.orderStatus)}>
              {orderDetails?.orderStatus}
            </Badge>
          </Label>
        </div>
      </div>

      <Separator />

      <div style={{ display: "grid", gap: "16px" }}>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ fontWeight: 500 }}>Order Details</div>
          <ul style={{ display: "grid", gap: "12px" }}>
            {orderDetails?.cartItems?.length
              ? orderDetails.cartItems.map((item) => (
                  <li style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        <div style={{ display: "grid", gap: "4px", color: "#6b7280" }}>
          <span>{user.userName}</span>
          <span>{orderDetails?.addressInfo?.address}</span>
          <span>{orderDetails?.addressInfo?.city}</span>
          <span>{orderDetails?.addressInfo?.pincode}</span>
          <span>{orderDetails?.addressInfo?.phone}</span>
          <span>{orderDetails?.addressInfo?.notes}</span>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
