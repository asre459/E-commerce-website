import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  const cardStyle = {
    padding: "2.5rem", // equivalent to p-10
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center",
  };

  const headerStyle = {
    padding: 0,
  };

  const titleStyle = {
    fontSize: "2.25rem", // text-4xl
    fontWeight: 700,
    margin: 0,
  };

  const buttonStyle = {
    marginTop: "1.25rem", // mt-5
  };

  return (
    <Card style={cardStyle}>
      <CardHeader style={headerStyle}>
        <CardTitle style={titleStyle}>Payment is successful!</CardTitle>
      </CardHeader>
      <Button style={buttonStyle} onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
