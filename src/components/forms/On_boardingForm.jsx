//src/components/forms/OnboardingForm.jsx
import { useState, useEffect, useContext } from "react";

import { passwordValidationErrors, isPhoneNumberValid } from "utils/validators";

import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";
import { set } from "immutable";

import AuthContext from "context/AuthContext";
import { useAuth } from "hooks";

export default function OnboardingForm() {
  const authContext = useContext(AuthContext);
  const { onboardUser } = useAuth();

  const [firstName, setFirstName] = useState(authContext.user?.firstName || "");
  const [lastName, setLastName] = useState(authContext.user?.lastName || "");
  const [email, setEmail] = useState(authContext.user?.emailAddress || "");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrong, setPassWordStrong] = useState(true);

  const [termsAndServicesBox, setTermsAndServicesBox] = useState(
    authContext.user?.externalAuth ? false : true
  );
  const [privacyPolicyBox, setPrivacyPolicyBox] = useState(
    authContext.user?.externalAuth ? false : true
  );

  const [passwordWarning, setPasswordWarning] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const [noConfPwd, setNoConfPwd] = useState(false);

  const [firstNameWarning, setFirstNameWarning] = useState(false);
  const [lastNameWarning, setLastNameWarning] = useState(false);
  const [phoneNumberWarning, setPhoneNumberWarning] = useState(false);

  const handleTermsAndServicesBox = () => {
    setTermsAndServicesBox(!termsAndServicesBox);
  };

  const handlePrivacyPolicyBox = () => {
    setPrivacyPolicyBox(!privacyPolicyBox);
  };

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
      text: "You need to add a valid phone number for order tracking.",
      type: "danger",
      isVisible: phoneNumber.length > 8 && !isPhoneNumberValid(phoneNumber),
    },
    {
      id: 6,
      text: "Passwords must match.",
      type: "danger",
      isVisible:
        ((!passwordsMatch && confirmPassword.length > 7) || noConfPwd) &&
        !authContext.user?.externalAuth,
    },
    {
      id: 7,
      text: "You need to accept the Terms and Privacy Policy.",
      type: "warning",
      isVisible: !termsAndServicesBox || !privacyPolicyBox,
    },
    {
      id: 8,
      text: "Please enter a password.",
      type: "warning",
      isVisible:
        password.length === 0 &&
        passwordWarning &&
        !authContext.user?.externalAuth,
    },
    {
      id: 9,
      text: "Please enter your first name.",
      type: "warning",
      isVisible: firstName.length === 0 && firstNameWarning,
    },
    {
      id: 10,
      text: "Please enter your last name.",
      type: "warning",
      isVisible: lastName.length === 0 && lastNameWarning,
    },
    {
      id: 11,
      text: "Please enter a phone number.",
      type: "warning",
      isVisible: phoneNumber.length === 0 && phoneNumberWarning,
    },
    {
      id: 12,
      text: "Password is strong! 🎉",
      type: "success",
      isVisible:
        passwordStrong &&
        !passwordsMatch &&
        password.length > 7 &&
        !authContext.user?.externalAuth,
    },
    {
      id: 13,
      text: "Passwords match! 🎉",
      type: "success",
      isVisible:
        passwordsMatch &&
        confirmPassword.length > 7 &&
        !authContext.user?.externalAuth,
    },
  ];
  messages = messages.map((message) => {
    if (!authContext.user?.externalAuth) {
      if (
        password.length > 4 &&
        passwordValidationErrors(password).includes(message.text)
      ) {
        return set(message, "isVisible", true);
      } else {
        return message;
      }
    }
    return message;
  });

  const [onboardClicked, setOnboardClicked] = useState(false);

  useEffect(() => {
    // Only run the timer if onboardClicked is true
    if (onboardClicked) {
      const timer = setTimeout(() => {
        setOnboardClicked(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timer if the component unmounts before the timer finishes
      return () => clearTimeout(timer);
    }
  }, [onboardClicked]);

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
    setPassWordStrong(
      passwordValidationErrors(password).length === 0 ? true : false
    );

    // Set isVisible to true for messages whose text field value can be found in the array of messages returned from isPasswordValid
  }, [password, confirmPassword]);

  useEffect(() => {
    setEmail(authContext.user?.emailAddress || "");
    setFirstName(authContext.user?.firstName || "");
    setLastName(authContext.user?.lastName || "");
  }, [authContext.user]);

  return (
    <>
      <FormValidationMessageWrapper messages={messages} />

      <form
        className="onboarding-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (!authContext.user?.externalAuth) {
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
          }

          if (firstName.length === 0) {
            setFirstNameWarning(true);
            return;
          }

          if (lastName.length === 0) {
            setLastNameWarning(true);
            return;
          }

          if (phoneNumber.length === 0) {
            setPhoneNumberWarning(true);
            return;
          }
          if (phoneNumber.length > 0 && !isPhoneNumberValid(phoneNumber)) {
            return;
          }

          if (!privacyPolicyBox || !termsAndServicesBox) return;

          if (!authContext.user?.externalAuth) {
            const user = {
              email,
              firstName,
              lastName,
              phoneNumber,
              password,
              passwordConfirm: confirmPassword,
            };

            setOnboardClicked(true);
            onboardUser(user, authContext.user?.externalAuth);
          } else {
            const user = {
              email,
              firstName,
              lastName,
              phoneNumber,
            };

            setOnboardClicked(true);
            onboardUser(user, authContext.user?.externalAuth);
          }
        }}
      >
        <div>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            Email used for Sign Up:
            <span
              style={{
                color: "var(--grayscale-40)",
              }}
            >
              Can be changed later in Settings.
            </span>
          </label>
          <input type="email" value={email} disabled />
        </div>

        {authContext.user?.externalAuth ? (
          <p
            style={{
              color: "var(--grayscale-60)",
            }}
            className="my-1"
          >
            You don't need a password, because you are using Google or Facebook
            to sign up. If you also want use our own built-in Sign In, you can
            add a password later in the Settings.
          </p>
        ) : (
          <>
            <div className="control">
              <label htmlFor="password">Password:</label>
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
              <label htmlFor="confirmPassword">Confirm password:</label>
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
          </>
        )}

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
              if (e.target.value.length > 0) setFirstNameWarning(false);
            }}
            value={firstName}
            placeholder="Enter your first name here"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
              if (e.target.value.length > 0) setLastNameWarning(false);
            }}
            value={lastName}
            placeholder="Enter your last name here"
          />
        </div>

        <div className="control">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (e.target.value.length > 0) setPhoneNumberWarning(false);
            }}
            value={phoneNumber}
            placeholder="Enter your phone number here"
          />
        </div>

        {authContext.user?.externalAuth ? (
          <>
            <div className="checkbox mt-2 ml-2">
              <input
                type="checkbox"
                checked={termsAndServicesBox}
                onChange={handleTermsAndServicesBox}
                name="termsAndServices"
                id="termsAndServices" // Unique ID for this checkbox
                className="custom-checkbox" // Class for custom styling
              />
              <label htmlFor="termsAndServices">
                I accept the Terms of Service
              </label>
            </div>

            <div className="checkbox mt-1 ml-2">
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
          </>
        ) : (
          ""
        )}

        {onboardClicked ? (
          <div
            className="loader"
            style={{ alignSelf: "center", marginTop: "1rem" }}
          ></div>
        ) : (
          <input type="submit" className="btn btn-primary" value="Let's go!" />
        )}
      </form>
    </>
  );
}
