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

export default function ProfileDashboardScreen() {
  const { dummyProductCardData, renderProductCards } = useProduct();
  const { shippingAddresses, billingAddresses } = useAuth();

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
                <p className="profile-summary__value">Márton</p>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Last Name</p>
                <p className="profile-summary__value">Kiss G.</p>
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
                <p className="profile-summary__value">+36 30 420 69 69</p>
              </div>
              <div className="profile-summary__item">
                <p className="profile-summary__label">Email</p>
                <p className="profile-summary__value">theshade42@gmail.com </p>
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
                {shippingAddresses.map(
                  (address) =>
                    address.isActive && (
                      <AddressCard
                        key={address._id}
                        isActive={address.isActive}
                        type="shipping"
                        name={address.name}
                        company={address.company}
                        taxNo={address.taxNo}
                        street={address.street}
                        city={address.city}
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
                {billingAddresses.map(
                  (address) =>
                    address.isActive && (
                      <AddressCard
                        key={address._id}
                        isActive={address.isActive}
                        type="billing"
                        name={address.name}
                        company={address.company}
                        taxNo={address.taxNo}
                        street={address.street}
                        city={address.city}
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
