import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { forgotPasswordFormControls } from "@/config"; // we'll define this
import { sendForgotPasswordEmail } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = { email: "" };

function AuthForgotPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(sendForgotPasswordEmail(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        setFormData(initialState);
      } else {
        toast({ title: data.payload.message, variant: "destructive" });
      }
    });
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111", margin: 0 }}>
          Forgot Password
        </h1>
        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          Remember your password?
          <Link
            to="/auth/login"
            style={{ marginLeft: "8px", fontWeight: "500", color: "#2563eb", textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Login
          </Link>
        </p>
      </div>

      {/* Form */}
      <CommonForm
        formControls={forgotPasswordFormControls}
        buttonText="Send Reset Link"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthForgotPassword;
