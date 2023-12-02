//src/components/forms/ManageAccountForms.jsx

// React Imports
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Library Imports
import {
  ExclamationTriangleFill,
  InfoCircleFill,
  Person,
  PersonXFill,
  PlusCircleFill,
  ShieldLockFill,
} from "react-bootstrap-icons";

// Utility Functions
import { formatPhoneNumber, isPhoneNumberValid, isEmailValid } from "utils";

// Component Imports
import AddressCard from "components/common/AddressCard";
import Button from "components/common/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardLogo,
  CardBody,
  CardFooter,
} from "components/common/Card";
import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";

import { useAuth } from "hooks";

export function ManagePersonalInfoForm() {
  const { user, updateUserInfo, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    confirmEmail: "",
  });
  const [validationMessages, setValidationMessages] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const { firstName, lastName, phoneNumber, email, confirmEmail } = userInfo;

    const messages = [
      {
        id: 1,
        text: "Name must not contain numbers or special characters.",
        type: "warning",
        isVisible:
          (firstName.length > 0 &&
            !/^[\u00C0-\u01FFa-zA-Z ]+$/.test(firstName)) ||
          (lastName.length > 0 && !/^[\u00C0-\u01FFa-zA-Z ]+$/.test(lastName)),
      },
      {
        id: 2,
        text: "First name must be at least 2 characters long.",
        type: "warning",
        isVisible: firstName.length > 0 && firstName.length < 2,
      },
      {
        id: 3,
        text: "You must enter a valid phone number.",
        type: "warning",
        isVisible: phoneNumber.length > 8 && !isPhoneNumberValid(phoneNumber),
      },
      {
        id: 4,
        text: "You must enter a valid email address.",
        type: "warning",
        isVisible: email.length > 5 && !isEmailValid(email),
      },
      {
        id: 5,
        text: "Emails do not match.",
        type: "danger",
        isVisible:
          isEmailValid(email) &&
          confirmEmail.length > 5 &&
          email !== confirmEmail,
      },
      {
        id: 6,
        text: "Emails match.",
        type: "success",
        isVisible:
          isEmailValid(email) &&
          confirmEmail.length > 5 &&
          email === confirmEmail,
      },
    ];

    setValidationMessages(messages.filter((message) => message.isVisible));
  }, [userInfo]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setResponse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationMessages.some((msg) => msg.isVisible)) return;

    // Create a new object with updated fields, falling back to original user values
    const updatedUserInfo = {
      firstName: userInfo.firstName || user.firstName,
      lastName: userInfo.lastName || user.lastName,
      phoneNumber: userInfo.phoneNumber || user.phoneNumber,
      emailAddress: userInfo.email || user.emailAddress,
    };

    try {
      const response = await updateUserInfo(updatedUserInfo);
      setResponse(response); // Assuming updateUserInfo returns a response
      console.log("response", response);
      if (response.status === "success") {
        const user = await response.data.user;
        setUser(user);
      }
    } catch (error) {
      setResponse("Error updating personal info");
    }
  };

  const formRef = useRef(null);

  return (
    <Card className={"profile-manage__personal-info"} deco={true}>
      <CardHeader align="start">
        <CardTitle
          className={"profile-manage__personal-info__title"}
          level="3"
          textAlign="left"
        >
          <CardLogo className={"card__logo--profile"}>
            <Person />
          </CardLogo>
          <span>
            Manage <strong>Personal Info</strong>
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <FormValidationMessageWrapper
          className="form-validation-message-wrapper--fixed-height"
          messages={validationMessages}
          showResponse={response !== null}
        >
          {response && (
            <div
              className={`form-validation-message form-validation-message--${
                response.status === "success" ? "success" : "danger"
              }`}
              aria-live="polite"
            >
              {response &&
                response.status === "success" &&
                "Account info updated successfully!"}
              {response &&
                response.status === "fail" &&
                "It didn't work, please try again."}
            </div>
          )}
        </FormValidationMessageWrapper>
        <form ref={formRef} onSubmit={handleSubmit} className="form--profile">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={userInfo.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder={user.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={userInfo.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder={user.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              value={userInfo.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              placeholder={formatPhoneNumber(user.phoneNumber)}
            />
          </div>
          <div className="w100">
            <div className="form-group">
              <label htmlFor="email">New Email</label>
              <input
                id="email"
                type="email"
                value={userInfo.email}
                name="email"
                onChange={handleChange}
                placeholder={user.emailAddress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmEmail">Confirm Email</label>
              <input
                id="confirmEmail"
                type="email"
                value={userInfo.confirmEmail}
                name="confirmEmail"
                onChange={handleChange}
                placeholder=""
              />
            </div>
          </div>
          {user.externalAuth && (
            <p className="form-message form-message--warning">
              <ExclamationTriangleFill />
              <span>
                Changing your email address will also change the Google &
                Facebook sign in email.
              </span>
            </p>
          )}
        </form>
      </CardBody>
      <CardFooter align="start">
        <Button
          variant="primary btn--muted"
          className="btn--bold"
          onClick={handleSubmit}
        >
          Save Updated Info
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ManagePasswordForm() {
  const navigate = useNavigate();

  const { user, clearAuthInfo } = useAuth();
  const [passwordData, setPasswordData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [validationMessages, setValidationMessages] = useState([]);

  useEffect(() => {
    const { passwordCurrent, password, passwordConfirm } = passwordData;

    const messages = [
      {
        id: 1,
        text: "Passwords must be at least 8 characters long.",
        type: "warning",
        isVisible: password.length > 5 && password.length < 8,
      },
      {
        id: 2,
        text: "Password must contain at least one number.",
        type: "warning",
        isVisible: password.length > 7 && !/\d/.test(password),
      },
      {
        id: 3,
        text: "Password must contain at least one uppercase letter.",
        type: "warning",
        isVisible: password.length > 7 && !/[A-Z]/.test(password),
      },
      {
        id: 4,
        text: "Current password and new password cannot be the same.",
        type: "danger",
        isVisible:
          passwordCurrent.length > 7 &&
          password.length > 7 &&
          passwordCurrent === password,
      },
      {
        id: 5,
        text: "Passwords do not match.",
        type: "danger",
        isVisible:
          password.length > 7 &&
          passwordConfirm.length > 7 &&
          password !== passwordConfirm,
      },
      {
        id: 6,
        text: "Passwords match.",
        type: "success",
        isVisible:
          password.length > 7 &&
          passwordConfirm.length > 7 &&
          password === passwordConfirm,
      },
    ];

    setValidationMessages(messages.filter((message) => message.isVisible));
  }, [passwordData]);

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setResponse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      passwordData.password.length < 5 ||
      passwordData.passwordCurrent.length < 5 ||
      passwordData.passwordConfirm.length < 5
    )
      return;

    // Check if no message or a success message is visible
    const allowSubmission =
      validationMessages.length === 0 ||
      validationMessages.some((msg) => msg.type === "success" && msg.isVisible);

    if (!allowSubmission) return;

    try {
      const response = await fetch("/api/user/profile/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(passwordData),
      });
      const data = await response.json();
      if (data.status === "success") {
        setTimeout(() => {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          clearAuthInfo();
        }, 3000);
        setTimeout(() => {
          navigate("/signin");
        }, 3250);
      }
      setResponse(data); // Assuming the response contains a 'message' field
    } catch (error) {
      setResponse("Error updating password");
    }
  };

  const formRef = useRef(null);

  return (
    <Card
      className={"profile-manage__password"}
      deco={true}
      id="managePassword"
    >
      <CardHeader align="start">
        <CardTitle
          className={"profile-manage__password__title"}
          level="3"
          textAlign="left"
        >
          <CardLogo className={"card__logo--profile"}>
            <ShieldLockFill />
          </CardLogo>
          <span>
            Manage <strong>Password</strong>
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {}
        <FormValidationMessageWrapper
          className="form-validation-message-wrapper--fixed-height"
          messages={validationMessages}
          showResponse={response !== null}
        >
          {response && response.status === "success" && (
            <div
              class="form-validation-message form-validation-message--success"
              aria-live="polite"
            >
              Password changed successfully! You will now need to sign in again.
            </div>
          )}
          {response && response.status === "fail" && (
            <div
              class="form-validation-message form-validation-message--danger"
              aria-live="polite"
            >
              Password update failed: {response.message}
            </div>
          )}
        </FormValidationMessageWrapper>

        <form ref={formRef} onSubmit={handleSubmit} className="form--profile">
          <div className="form-group">
            <label htmlFor="passwordCurrent">Current Password</label>
            {
              // TODO - Change this to hasPassword once the API is updated
              !user.externalAuth ? (
                <input
                  id="passwordCurrent"
                  type="password"
                  name="passwordCurrent"
                  value={passwordData.passwordCurrent}
                  onChange={(e) => handleChange(e)}
                />
              ) : (
                <input
                  id="passwordCurrent"
                  type="password"
                  name="passwordCurrent"
                  placeholder="—"
                  disabled
                />
              )
            }
          </div>
          {
            // TODO - Change this to hasPassword once the API is updated
            user.externalAuth && (
              <p className="form-message form-message--info">
                <InfoCircleFill />
                <span>
                  You don’t have a password yet, because you signed up with
                  Google or Facebook.
                </span>
              </p>
            )
          }
          <div className="w100">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                value={passwordData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm New Password</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="********"
                value={passwordData.passwordConfirm}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter align="start">
        <Button
          variant="primary btn--muted"
          className="btn--bold"
          onClick={handleSubmit}
        >
          Update Password
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ManageAddressesForm({ type, addresses, id, onAddAddress }) {
  return (
    <Card id={id} className={"profile-manage__addresses"} deco={true}>
      <CardHeader align="start">
        <CardTitle
          className={"profile-manage__addresses__title"}
          level="3"
          textAlign="left"
        >
          <CardLogo className={"card__logo--profile"}>
            <Person />
          </CardLogo>
          <span>
            Manage{" "}
            <strong>{type === "shipping" ? "Shipping" : "Billing"}</strong>{" "}
            Addresses
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody className={"mb-2 mx-1"}>
        <div className="address-list">
          {addresses.length === 0 && (
            <p
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#888",
              }}
            >
              {`No ${type} addresses yet.`}
            </p>
          )}
          {addresses.map((address, i) => (
            <AddressCard
              key={`${type}-${address.id}`}
              isEditable={true}
              isActive={address.isActive}
              type={type}
              name={address.name}
              company={address.company}
              vatID={address.vatID}
              street={address.street}
              city={address.city}
              phoneNumber={address.phoneNumber}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter align="start">
        <Button
          variant="primary btn--muted"
          className="btn--bold"
          onClick={() => {
            onAddAddress(type);
          }}
        >
          <PlusCircleFill />
          Add New Address
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DeleteAccountForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="delete-account-form"
    >
      <Button variant="outline-danger btn--muted btn--compact">
        <PersonXFill />
        Delete Account
      </Button>
    </form>
  );
}
