//src/screens/profile/ProfileDashboardScreen.jsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardImage,
  CardBody,
  CardFooter,
} from "components/common/Card";
import {
  HeartFill,
  PencilSquare,
  Truck,
  FileEarmarkTextFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ProfileScreen from "screens/profile/ProfileScreen";
import Button from "components/common/Button";
import AddressCard from "components/common/AddressCard";

import { useAuth, useProduct } from "hooks";

import { formatPhoneNumber, splitAddressesByType } from "utils";

import { useState, useEffect } from "react";

export default function ProfileDashboardScreen() {
  const { user, fetchUserAddresses } = useAuth();

  const [addresses, setAddresses] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const fetchedAddresses = await fetchUserAddresses();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        // Handle errors as needed
      }
    }

    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses) {
      const { shippingAddresses, billingAddresses } =
        splitAddressesByType(addresses);
      setShippingAddresses(shippingAddresses);
      setBillingAddresses(billingAddresses);
      console.log("shippingAddresses", shippingAddresses);
      console.log("billingAddresses", billingAddresses);
    }
  }, [addresses]);

  /* TODO - Remove for production */
  const { dummyProductCardData, renderProductCards } = useProduct();

  return (
    <ProfileScreen
      activeScreen="/profile"
      title="Profile Dashboard"
      subtitle="Your most important profile information at a glance."
    >
      <section className="profile-main__content profile-dashboard">
        <Card className={"profile-summary"} dropShade={false} deco={true}>
          <Button
            variant="outline-light btn--compact btn--muted"
            className="profile-manage-button"
          >
            <Link to="/profile/manage">
              <PencilSquare />
              <span>
                Manage <strong>Account Details</strong>
              </span>
            </Link>
          </Button>
          <CardHeader align="start">
            <CardTitle
              className={"profile-summary__title"}
              level="3"
              textAlign="left"
            >
              Basic Account Details
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="profile-summary__list">
              <div className="profile-summary__item">
                <p className="profile-summary__label">First Name</p>
                <p className="profile-summary__value">{user.firstName}</p>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Last Name</p>
                <p className="profile-summary__value">{user.lastName}</p>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Password</p>
                <Link
                  to="/profile/manage"
                  className="profile-summary__value profile-summary__value--link"
                >
                  Change Password Here
                </Link>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Phone Number</p>
                <p className="profile-summary__value">
                  {formatPhoneNumber(user.phoneNumber)}
                </p>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Email</p>
                <p className="profile-summary__value">{user.emailAddress}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <div className="primary-address-cards-container primary-address-cards-container--primary">
          <Card className={"address-card"} dropShade={false} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                <span>
                  Primary <strong>Shipping</strong>
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="address-list address-list--primary">
                {shippingAddresses &&
                  shippingAddresses.map(
                    (address) =>
                      address.isActive && (
                        <AddressCard
                          key={address._id}
                          isActive={address.isActive}
                          type="shipping"
                          name={address.name || address.company || address.city}
                          company={address.company}
                          vatID={address.vatID}
                          street={address.street}
                          zip={address.zip}
                          city={address.city}
                          country={address.country}
                          phoneNumber={address.phoneNumber}
                        />
                      )
                  )}
              </div>
            </CardBody>
            <CardFooter align="start">
              <Button
                variant="outline-light btn--compact btn--muted"
                className="profile-manage-button"
              >
                <Link to="/profile/manage">
                  <Truck />
                  <span>
                    Manage <strong>Shipping</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className={"address-card"} dropShade={false} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                <span>
                  Primary <strong>Billing</strong>
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="address-list address-list--primary">
                {billingAddresses &&
                  billingAddresses.map(
                    (address) =>
                      address.isActive && (
                        <AddressCard
                          key={address._id}
                          isActive={address.isActive}
                          type="billing"
                          name={address.name || address.company || address.city}
                          company={address.company}
                          vatID={address.vatID}
                          street={address.street}
                          zip={address.zip}
                          city={address.city}
                          country={address.country}
                          phoneNumber={address.phoneNumber}
                        />
                      )
                  )}
              </div>
            </CardBody>
            <CardFooter align="start">
              <Button
                variant="outline-light btn--compact btn--muted"
                className="profile-manage-button"
              >
                <Link to="/profile/manage">
                  <FileEarmarkTextFill />
                  <span>
                    Manage <strong>Billing</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Card className={"favorites-summary"} dropShade={false} deco={true}>
          <CardHeader align="start">
            <CardTitle
              className={"favorites-summary__title"}
              level="3"
              textAlign="left"
            >
              <span>
                Your <strong>Favorite</strong> Products
              </span>
            </CardTitle>
          </CardHeader>
          <CardBody className={"favorites-summary__list"}>
            {renderProductCards(dummyProductCardData)}
          </CardBody>
          <CardFooter align="start">
            <Button
              variant="outline-light btn--compact btn--muted"
              className="profile-manage-button"
            >
              <Link to="/profile/favorites">
                <HeartFill />
                <span>
                  Manage Your <strong>Favorites</strong>
                </span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </ProfileScreen>
  );
}
