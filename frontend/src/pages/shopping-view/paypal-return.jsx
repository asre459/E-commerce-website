import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  const cardStyle = {
    padding: "1.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center",
  };

  const headerStyle = {
    padding: "0",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: 0,
  };

  return (
    <Card style={cardStyle}>
      <CardHeader style={headerStyle}>
        <CardTitle style={titleStyle}>
          Processing Payment... Please wait!
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
