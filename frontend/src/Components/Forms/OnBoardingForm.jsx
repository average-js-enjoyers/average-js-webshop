//src/components/forms/OnboardingForm.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isPasswordValid } from "utils/validators";
import { onboardUser } from "api";

export default function OnboardingForm() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState("");
  const [nonHashedPassword, setnonHashedPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [passWordsMatch, setPassWordsMatch] = useState(true);
  const [passWordStrong, setPassWordStrong] = useState(true);

  //fetch email

  const handleSubmit = (e) => {
    e.preventDefault();

    return onboardUser({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: nonHashedPassword,
      passwordConfirm: confirmPassword,
    });
  };

  const passWordErrorStatesHandler = (password) => {
    if (nonHashedPassword === confirmPassword) {
      setPassWordsMatch(true);
    } else if (confirmPassword.length > 5) {
      setPassWordsMatch(false);
    }

    if (isPasswordValid(password)) {
      setPassWordStrong(true);
    } else if (nonHashedPassword.length > 5) {
      setPassWordStrong(false);
    }
  };

  useEffect(() => {
    passWordErrorStatesHandler(nonHashedPassword);
  }, [nonHashedPassword, confirmPassword]);

  return (
    <>
      <div>Sign up here:</div>

      {!passWordsMatch && (
        <div style={{ color: "red" }}>The passwords do not match!</div>
      )}
      {!passWordStrong && (
        <div style={{ color: "red" }}>The password is too weak!</div>
      )}

      <form className="SignUpFields" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="firstName">First Name:</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            id="firstName"
          />
        </div>

        <div className="control">
          <label htmlFor="lastName">Last Name:</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            id="lastName"
          />
        </div>

        <div className="control">
          <label htmlFor="lastName">Phone Number:</label>
          <input
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            id="phoneNumber"
          />
        </div>

        <div className="control">
          <label htmlFor="nonHashedPassword">Password:</label>
          <input
            type="password"
            onChange={(e) => setnonHashedPassword(e.target.value)}
            name="nonHashedPassword"
            id="nonHashedPassword"
          />
        </div>

        <div className="control">
          <label htmlFor="confirmPassword">Confrim password:</label>
          <input
            type="password"
            onChange={(e) => setconfirmPassword(e.target.value)}
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>

        <div className="button">
          <button type="submit">Ready to Shop!</button>
        </div>
      </form>
    </>
  );
}
