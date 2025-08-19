import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = { status: "" };

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllOrdersForAdmin());
          setFormData(initialFormData);
          toast({ title: data?.payload?.message });
        }
      });
  }

  return (
    <DialogContent style={{ maxWidth: "600px" }}>
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", marginTop: "24px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div style={{ display: "flex", marginTop: "8px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div style={{ display: "flex", marginTop: "8px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>

          <div style={{ display: "flex", marginTop: "8px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div style={{ display: "flex", marginTop: "8px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div style={{ display: "flex", marginTop: "8px", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "500" }}>Order Status</p>
            <Label>
              <Badge
                style={{
                  padding: "4px 12px",
                  backgroundColor:
                    orderDetails?.orderStatus === "confirmed"
                      ? "#22c55e"
                      : orderDetails?.orderStatus === "rejected"
                      ? "#dc2626"
                      : "#000",
                  color: "#fff"
                }}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <div style={{ fontWeight: "500" }}>Order Details</div>
            <ul style={{ display: "grid", gap: "12px" }}>
              {orderDetails?.cartItems?.map((item) => (
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <div style={{ fontWeight: "500" }}>Shipping Info</div>
            <div style={{ display: "grid", gap: "4px", color: "#6b7280" }}>
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[{
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            }]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
