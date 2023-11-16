import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import AuthContext from "context/AuthContext";
import StatusMessage from "components/common/StatusMessage";
import Button from "components/common/Button";

import { isEmailValid } from "utils/validators";

import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";

function ForgotPasswordForm({ className }) {
  const { sendPasswordResetEmail } = useAuth();
  const {
    passwordResetLinkSent,
    responseData,
    clearResponseData,
    setAuthState,
  } = useContext(AuthContext);

  const [sendResetClicked, setSendResetClicked] = useState(false);

  const [email, setEmail] = useState("");

  let messages = [
    {
      id: 1,
      text: "Please enter an email address.",
      type: "warning",
      isVisible: email.length === 0 && sendResetClicked,
    },
    {
      id: 2,
      text: "Please make sure the email address is valid.",
      type: "danger",
      isVisible: email.length > 5 && !isEmailValid(email),
    },
  ];

  useEffect(() => {
    // Only run the timer if sendResetClicked is true
    if (sendResetClicked) {
      const timer = setTimeout(() => {
        setSendResetClicked(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timer if the component unmounts before the timer finishes
      return () => clearTimeout(timer);
    }
  }, [sendResetClicked]);

  return (
    <div className={className}>
      {passwordResetLinkSent && (
        <StatusMessage
          type="success"
          message="Sent password reset link to your email!"
          cleanupFunction={() => {
            setAuthState((prevState) => ({
              ...prevState,
              passwordResetLinkSent: false,
            }));
          }}
        />
      )}
      {responseData?.error && responseData !== null && (
        <StatusMessage
          type="danger"
          message={
            responseData?.message === "There is no user with email address."
              ? "We couldn't find a user with this email address. 😐"
              : responseData?.message
          }
          cleanupFunction={() => clearResponseData()}
        />
      )}
      <FormValidationMessageWrapper messages={messages} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSendResetClicked(true);

          if (email.length === 0) {
            return;
          }

          if (!isEmailValid(email)) {
            return;
          }

          return sendPasswordResetEmail(e.target.email.value);
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email address"
          />
        </div>

        {sendResetClicked && !responseData?.error && isEmailValid(email) ? (
          <div
            className="loader"
            style={{ alignSelf: "center", marginTop: "1rem" }}
          ></div>
        ) : (
          <Button variant="primary mt-3">Send Reset Link</Button>
        )}
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
