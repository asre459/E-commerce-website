import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { resetPasswordFormControls } from "@/config";
import { resetUserPassword } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialState = { newPassword: "" };

function AuthResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { token } = useParams(); // from /auth/reset-password/:token

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetUserPassword({ token, newPassword: formData.newPassword })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        navigate("/auth/login");
      } else {
        toast({ title: data.payload.message, variant: "destructive" });
      }
    });
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111", margin: 0 }}>
          Reset Password
        </h1>
        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          Enter your new password below.
        </p>
      </div>

      <CommonForm
        formControls={resetPasswordFormControls}
        buttonText="Reset Password"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthResetPassword;
