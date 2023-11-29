//src/components/forms/ManageAccountForms.jsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardLogo,
  CardBody,
  CardFooter,
} from "components/common/Card";
import {
  ExclamationTriangleFill,
  InfoCircleFill,
  Person,
  PersonXFill,
  PlusCircleFill,
  ShieldLockFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "components/common/Button";
import { useState } from "react";
import AddressCard from "components/common/AddressCard";
import { useAuth } from "hooks";
import { formatPhoneNumber } from "utils";

export function ManagePersonalInfoForm() {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form--profile"
        >
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={user.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder={user.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={formatPhoneNumber(user.phoneNumber)}
            />
          </div>
          <div className="w100">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.emailAddress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmEmail">Confirm Email</label>
              <input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                name="confirmEmail"
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <p className="form-message form-message--warning">
            <ExclamationTriangleFill />
            <span>
              Changing your email address will also change the Google & Facebook
              sign in email.
            </span>
          </p>
        </form>
      </CardBody>
      <CardFooter align="start">
        <Button variant="primary btn--muted" className="btn--bold">
          Save Updated Info
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ManagePasswordForm() {
  return (
    <Card className={"profile-manage__password"} deco={true}>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form--profile"
        >
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              placeholder="—"
              disabled
            />
          </div>
          <p className="form-message form-message--info">
            <InfoCircleFill />
            <span>
              You don’t have a password yet, because you signed up with Google
              or Facebook.
            </span>
          </p>
          <div className="w100">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="********"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                type="password"
                name="confirmNewPassword"
                placeholder="********"
              />
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter align="start">
        <Button variant="primary btn--muted" className="btn--bold">
          Update Password
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ManageAddressesForm({ type, addresses }) {
  return (
    <Card className={"profile-manage__addresses"} deco={true}>
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
        <Button variant="primary btn--muted" className="btn--bold">
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
