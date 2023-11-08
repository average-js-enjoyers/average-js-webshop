import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doesEmailExist } from "api";

import {
  FormValidationMessageWrapper,
  FormValidationMessage,
} from "components/forms/FormValidationMessage";

import { useAuth } from "hooks";

const isEmailValid = (email) => {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const QuickSignUpForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [termsAndServicesBox, setTermsAndServicesBox] = useState(false);
  const [privacyPolicyBox, setPrivacyPolicyBox] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailTaken, setEmailTaken] = useState(false);

  const signUpEnabled =
    emailValid && !emailTaken && privacyPolicyBox && termsAndServicesBox;

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSignUp({
      emailAddress: email,
    });
  };

  const handleTermsAndServicesBox = () => {
    setTermsAndServicesBox(!termsAndServicesBox);
  };

  const handlePrivacyPolicyBox = () => {
    setPrivacyPolicyBox(!privacyPolicyBox);
  };

  const emailErrorStateHandler = async (email) => {
    const valid = isEmailValid(email);
    setEmailValid(valid);

    if (valid) {
      // Only check if the email is taken when it's valid.
      const taken = await doesEmailExist({ emailAddress: email });
      setEmailTaken(taken);
    } else {
      // If the email is not valid, it can't be taken.
      setEmailTaken(false);
    }
  };

  useEffect(() => {
    emailErrorStateHandler(email);
  }, [email]);

  const messages = [
    {
      id: 1,
      text: "Invalid E-Mail address!",
      type: "danger",
      isVisible: !emailValid && email.length > 0,
    },
    {
      id: 2,
      text: "E-Mail address is already in use!",
      type: "danger",
      isVisible: emailTaken,
    },
    {
      id: 3,
      text: "E-Mail address is available!",
      type: "success",
      isVisible: emailValid && !emailTaken && email.length > 5,
    },
    {
      id: 4,
      text: "Please enter an E-Mail address!",
      type: "warning",
      isVisible: emailValid && email.length === 0,
    },
    {
      id: 5,
      text: (
        <span>
          You must accept the{" "}
          <Link to="/terms-of-service">Terms of Service</Link> to sign up!
        </span>
      ),
      type: "warning",
      isVisible:
        termsAndServicesBox === false && emailValid && email.length > 5,
    },
    {
      id: 6,
      text: (
        <span>
          You must accept the <Link to="/privacy-policy">Privacy Policy</Link>{" "}
          to sign up!
        </span>
      ),
      type: "warning",
      isVisible: privacyPolicyBox === false && emailValid && email.length > 5,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormValidationMessageWrapper messages={messages} />

      <div className="control">
        <label htmlFor="email">Your Email Address</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="Enter your email address here"
        />
      </div>

      <div className="checkbox mt-2">
        <input
          type="checkbox"
          checked={termsAndServicesBox}
          onChange={handleTermsAndServicesBox}
          name="termsAndServices"
          id="termsAndServices" // Unique ID for this checkbox
          className="custom-checkbox" // Class for custom styling
        />
        <label htmlFor="termsAndServices">I accept the Terms of Service</label>
      </div>

      <div className="checkbox mt-1">
        <input
          type="checkbox"
          checked={privacyPolicyBox}
          onChange={handlePrivacyPolicyBox}
          name="privacyPolicy"
          id="privacyPolicy" // Unique ID for this checkbox
          className="custom-checkbox" // Same class for consistent styling
        />
        <label htmlFor="privacyPolicy">I accept the Privacy Policy</label>
      </div>

      <input
        type="submit"
        className="btn btn-primary"
        disabled={!signUpEnabled}
        value="Sign Up Now"
      />
    </form>
  );
};

export default QuickSignUpForm;
