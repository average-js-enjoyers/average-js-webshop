import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doesEmailExist } from "api";

import { isEmailValid, isPasswordValid } from "utils/validators";

import { isUserRegistered } from "api/authApi";

export default function OnboardingForm({ onSignUp }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState("");
  const [termsAndServicesBox, setTermsAndServicesBox] = useState(false);
  const [privacyPolicyBox, setPrivacyPolicyBox] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailTaken, setEmailTaken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSignUp({
      emailAddress: email,
    });
  };

  const emailErrorStateHandler = (email) => {
    if (isEmailValid(email)) {
      setEmailValid(true);
    } else if (email.length > 5) {
      setEmailValid(false);
    }

    // if (checkIfUserIsRegistered(email)) {
    //   setEmailTaken(true);
    // } else if (email.length > 5) {
    //   setEmailTaken(false);
    // }
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
    emailErrorStateHandler(email);
  }, [email]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="control">
        {!emailValid && (
          <div style={{ color: "red" }}>Invalid E-mail address!</div>
        )}
        {emailTaken && (
          <div style={{ color: "red" }}>E-mail address is already in use!</div>
        )}
        <label htmlFor="email">Your Email Address</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="Enter your email address here"
        />
      </div>

      <div className="control">
        <label htmlFor="email">I accept the Terms of Service:</label>
        <input
          type="checkbox"
          checked={termsAndServicesBox}
          onChange={handleTermsAndServicesBox}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="email">I accept the Privacy Policy:</label>
        <input
          type="checkbox"
          checked={privacyPolicyBox}
          onChange={handlePrivacyPolicyBox}
          name="email"
          id="email"
        />
      </div>

      {emailValid && privacyPolicyBox && termsAndServicesBox && (
        <input
          type="submit"
          className="btn btn-primary"
          disabled
          value="Sign Up Now"
        />
      )}
    </form>
  );
}
