import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isEmailValid, isPasswordValid } from "utils/validators";

import { isUserRegistered } from "api/authApi";

export default function OnboardingForm({ onSignUp }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState("");
  const [nonHashedPassword, setnonHashedPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passWordsMatch, setPassWordsMatch] = useState(true);
  const [passWordStrong, setPassWordStrong] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [emailTaken, setEmailTaken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSignUp({
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: nonHashedPassword,
      passwordConfirm: confirmPassword,
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

  useEffect(() => {
    passWordErrorStatesHandler(nonHashedPassword);
  }, [nonHashedPassword, confirmPassword]);

  return (
    <>
      <div>Sign up here:</div>
      {!emailValid && (
        <div style={{ color: "red" }}>Invalid E-mail address!</div>
      )}
      {/* {!emailTaken && (
        <div style={{ color: "red" }}>E-mail address already in use!</div>
      )} */}
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
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
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

        {emailValid && passWordsMatch && passWordStrong && (
          <div className="button">
            <button type="submit">Sign up!</button>
          </div>
        )}
      </form>
    </>
  );
}
