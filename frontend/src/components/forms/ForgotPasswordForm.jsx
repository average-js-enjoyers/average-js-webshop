import React, { useContext } from "react";
import { useAuth } from "hooks/useAuth";
import AuthContext from "context/AuthContext";
import StatusMessage from "components/common/StatusMessage";
import Button from "components/common/Button";

function ForgotPasswordForm({ className }) {
  const { sendPasswordResetEmail } = useAuth();
  const { passwordResetLinkSent, responseData, clearResponseData } =
    useContext(AuthContext);

  console.log(responseData);

  return (
    <div className={className}>
      {passwordResetLinkSent && (
        <StatusMessage
          type="success"
          message="Sent password reset link to your email!"
        />
      )}
      {responseData?.error && responseData !== null && (
        <StatusMessage
          type="danger"
          message={responseData?.message}
          cleanupFunction={() => clearResponseData()}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          return sendPasswordResetEmail(e.target.email.value);
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email address"
          />
        </div>
        <Button variant="primary btn-block mt-3">Send Reset Link</Button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
