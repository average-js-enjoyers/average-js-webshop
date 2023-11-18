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

import { useProduct } from "hooks/useProduct";

export default function ProfileDashboardScreen() {
  const { dummyProductCardData, renderProductCards } = useProduct();

  return (
    <ProfileScreen
      activeScreen="/profile"
      title="My Profile"
      subtitle="Check out and change anything about you: personal details,
    addresses, favorites and more."
    >
      <section className="profile-main__content profile-dashboard">
        <Card className={"profile-summary"} dropShade={true} deco={true}>
          <Button
            variant="outline-light btn--compact btn--muted"
            className="profile-edit-button"
          >
            <Link to="/profile/edit">
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
                  to="/profile/edit"
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
                <p className="profile-summary__value">theshade42@gmail.com</p>
              </div>
            </div>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <div className="primary-addresses-container">
          <Card className={"primary-address-card"} dropShade={true} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                Primary <strong>Shipping</strong>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="primary-address-card__item">
                <div className="badge badge--success">Active</div>
                <p className="primary-address-card__address-name">
                  Cube Base HQ
                </p>
                <p className="primary-address-card__street">
                  Csók István tér 420.
                </p>
                <p className="primary-address-card__city">
                  2483 Gárdony, HUNGARY
                </p>
                <p className="primary-address-card__phone-number">
                  +36 30 420 69 69
                </p>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                variant="outline-light btn--compact btn--muted"
                className="profile-edit-button"
              >
                <Link to="/profile/edit">
                  <Truck />
                  <span>
                    Manage <strong>Shipping</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className={"primary-address-card"} dropShade={true} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                Primary <strong>Billing</strong>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="primary-address-card__item">
                <div className="badge badge--success">Active</div>
                <p className="primary-address-card__address-name">L-TECH</p>
                <p className="primary-address-card__company">L-TECH Kft.</p>
                <p className="primary-address-card__tax-no">
                  Tax: <span>11116422-2-07</span>
                </p>
                <p className="primary-address-card__street">
                  Széchenyi utca 105.
                </p>
                <p className="primary-address-card__city">
                  8151 Szabadbattyán, HUNGARY
                </p>
                <p className="primary-address-card__phone-number">
                  +36 30 339 82 88
                </p>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                variant="outline-light btn--compact btn--muted"
                className="profile-edit-button"
              >
                <Link to="/profile/edit">
                  <FileEarmarkTextFill />
                  <span>
                    Manage <strong>Billing</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Card className={"favorites-summary"} dropShade={true} deco={true}>
          <CardHeader align="start">
            <CardTitle
              className={"favorites-summary__title"}
              level="3"
              textAlign="left"
            >
              Your <strong>Favorite</strong> Products
            </CardTitle>
          </CardHeader>
          <CardBody className={"favorites-summary__list"}>
            {renderProductCards(dummyProductCardData)}
          </CardBody>
          <CardFooter>
            <Button
              variant="outline-light btn--compact btn--muted"
              className="profile-edit-button"
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
