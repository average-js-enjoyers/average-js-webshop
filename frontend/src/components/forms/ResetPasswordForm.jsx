import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import StatusMessage from "components/common/StatusMessage";
import Button from "components/common/Button";

import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";
import { set } from "immutable";

import { passwordValidationErrors } from "utils/validators";

function ResetPasswordForm({ className }) {
  const { responseData, clearResponseData, resetPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [passwordWarning, setPasswordWarning] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrong, setPassWordStrong] = useState(true);

  const [noConfPwd, setNoConfPwd] = useState(false);

  console.log(sessionStorage.getItem("resetPwdToken"));

  let messages = [
    {
      id: 1,
      text: "Password must be at least 8 characters long.",
      type: "danger",
      isVisible: passwordLength,
    },
    {
      id: 2,
      text: "Password must contain at least one digit.",
      type: "danger",
      isVisible: false,
    },
    {
      id: 3,
      text: "Password must contain at least one lowercase letter.",
      type: "danger",
      isVisible: false,
    },
    {
      id: 4,
      text: "Password must contain at least one uppercase letter.",
      type: "danger",
      isVisible: false,
    },
    {
      id: 5,
      text: "Passwords must match.",
      type: "danger",
      isVisible: (!passwordsMatch && confirmPassword.length > 7) || noConfPwd,
    },
    {
      id: 6,
      text: "Please enter a password.",
      type: "warning",
      isVisible: password.length === 0 && passwordWarning,
    },
    {
      id: 7,
      text: "Password is strong! 🎉",
      type: "success",
      isVisible: passwordStrong && !passwordsMatch && password.length > 7,
    },
    {
      id: 8,
      text: "Passwords match! 🎉",
      type: "success",
      isVisible: passwordsMatch && confirmPassword.length > 7,
    },
  ];
  messages = messages.map((message) => {
    if (
      password.length > 4 &&
      passwordValidationErrors(password).includes(message.text)
    ) {
      return set(message, "isVisible", true);
    } else {
      return message;
    }
  });

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
    setPassWordStrong(
      passwordValidationErrors(password).length === 0 ? true : false
    );

    // Set isVisible to true for messages whose text field value can be found in the array of messages returned from isPasswordValid
  }, [password, confirmPassword]);

  return (
    <div className={className}>
      {/* {passwordResetLinkSent && (
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
      )}*/}
      {responseData?.error && responseData !== null && (
        <StatusMessage
          type="danger"
          message={responseData?.message}
          cleanupFunction={() => clearResponseData()}
        />
      )}

      <FormValidationMessageWrapper messages={messages} />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (password.length === 0) {
            setPasswordWarning(true);
            return;
          } else if (password.length < 8) {
            setPasswordLength(true);
            return;
          }
          if (!passwordsMatch) {
            setNoConfPwd(true);
            return;
          }
          if (!passwordStrong) return;

          const payload = {
            token: sessionStorage.getItem("resetPwdToken"),
            password: password,
            passwordConfirm: confirmPassword,
          };
          return resetPassword(payload);
        }}
      >
        <div className="control">
          <label htmlFor="password">Your New Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length > 0) setPasswordWarning(false);
              if (e.target.value.length > 7) setPasswordLength(false);
            }}
            placeholder="Enter your password here"
          />
        </div>

        <div className="control">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              if (e.target.value.length > 0) setNoConfPwd(false);
              setconfirmPassword(e.target.value);
            }}
            placeholder="Confirm your password here"
          />
        </div>

        {/* {sendResetClicked && !responseData?.error ? (
          <div
            className="loader"
            style={{ alignSelf: "center", marginTop: "1rem" }}
          ></div>
        ) : ( */}
        <Button variant="primary mt-3">Reset My Password!</Button>
        {/* )} */}
      </form>
    </div>
  );
}

export default ResetPasswordForm;
