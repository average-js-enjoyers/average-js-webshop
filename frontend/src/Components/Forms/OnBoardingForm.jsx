//src/components/forms/OnboardingForm.jsx
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { passwordValidationErrors } from "utils/validators";
import { onboardUser } from "api";

import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";
import { set } from "immutable";

import AuthContext from "context/AuthContext";

export default function OnboardingForm() {
  const authContext = useContext(AuthContext);

  const [firstName, setFirstName] = useState(authContext.user?.firstName || "");
  const [lastName, setLastName] = useState(authContext.user?.lastName || "");

  const [email, setEmail] = useState(authContext.user?.emailAddress);

  const [phoneNumber, setPhoneNumber] = useState(null);

  const [password, setnonHashedPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrong, setPassWordStrong] = useState(true);

  let messages = [
    {
      id: 1,
      text: "Password must be at least 8 characters long.",
      type: "danger",
      isVisible: false,
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
      text: "Password is strong! 🎉",
      type: "success",
      isVisible: passwordStrong,
    },
    {
      id: 6,
      text: "Passwords must match.",
      type: "danger",
      isVisible: !passwordsMatch && confirmPassword.length > 7,
    },
    {
      id: 7,
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
    <>
      <FormValidationMessageWrapper messages={messages} />

      <form
        className="SignUpFields"
        onSubmit={(e) => {
          e.preventDefault();

          return onboardUser({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: password,
            passwordConfirm: confirmPassword,
          });
        }}
      >
        <div>
          <label>Sign Up Email:</label>
          <input type="email" value={email} disabled />
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Enter your first name here"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Enter your last name here"
          />
        </div>

        <div className="control">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="control">
          <label htmlFor="nonHashedPassword">Password:</label>
          <input
            type="password"
            onChange={(e) => setnonHashedPassword(e.target.value)}
            placeholder="Enter your password here"
          />
        </div>

        <div className="control">
          <label htmlFor="confirmPassword">Confrim password:</label>
          <input
            type="password"
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm your password here"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Let's Go!" />
      </form>
    </>
  );
}
