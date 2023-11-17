import {
  Card,
  CardHeader,
  CardTitle,
  CardImage,
  CardBody,
  CardFooter,
} from "components/common/Card";
import { PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ProfileScreen from "screens/profile/ProfileScreen";
import Button from "components/common/Button";

const ViewProfileScreen = () => {
  return (
    <ProfileScreen
      activeScreen="/profile"
      title="My Profile"
      subtitle="Check out and change anything about you: personal details,
    addresses, favorites and more."
    >
      <div className="profile-cards-container">
        <Card className={"user-detail-summary"} dropShade={true} deco={true}>
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
              className={"user-detail-summary__title"}
              level="3"
              textAlign="left"
            >
              Basic Account Details
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="user-detail-summary__list">
              <div className="user-detail-summary__item">
                <p className="user-detail-summary__label">First Name</p>
                <p className="user-detail-summary__value">Márton</p>
              </div>
              <div className="user-detail-summary__item">
                <p className="user-detail-summary__label">Last Name</p>
                <p className="user-detail-summary__value">Kiss G.</p>
              </div>
              <div className="user-detail-summary__item">
                <p className="user-detail-summary__label">Password</p>
                <Link
                  to="/profile/edit"
                  className="user-detail-summary__value user-detail-summary__value--link"
                >
                  Change Password Here
                </Link>
              </div>
              <div className="user-detail-summary__item">
                <p className="user-detail-summary__label">Phone Number</p>
                <p className="user-detail-summary__value">+36 30 420 69 69</p>
              </div>
              <div className="user-detail-summary__item">
                <p className="user-detail-summary__label">Email</p>
                <p className="user-detail-summary__value">
                  teker.marton@gmail.com
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="shipping-billing-container">
          <Card className={"address-list-summary"} dropShade={true} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                <strong>Shipping</strong> Addresses
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="address-list-summary__item">
                <div className="badge badge-success">Active</div>
                <p className="address-list-summary__address-name">
                  Cube Base HQ
                </p>
                <p className="address-list-summary__street">
                  Csók István tér 420.
                </p>
                <p className="address-list-summary__city">
                  2483 Gárdony, HUNGARY
                </p>
                <p className="address-list-summary__phone-number">
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
                  <PencilSquare />
                  <span>
                    Manage <strong>Shipping</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className={"address-list-summary"} dropShade={true} deco={true}>
            <CardHeader align="start">
              <CardTitle level="3" textAlign="left">
                <strong>Billing</strong> Addresses
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="address-list-summary__item">
                <div className="badge badge-success">Active</div>
                <p className="address-list-summary__address-name">
                  Cube Base HQ
                </p>
                <p className="address-list-summary__street">
                  Csók István tér 420.
                </p>
                <p className="address-list-summary__city">
                  2483 Gárdony, HUNGARY
                </p>
                <p className="address-list-summary__phone-number">
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
                  <PencilSquare />
                  <span>
                    Manage <strong>Billing</strong> Addresses
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Card
          className={"favorite-products-summary"}
          dropShade={true}
          deco={true}
        >
          <CardHeader align="start">
            <CardTitle
              className={"favorite-products-summary__title"}
              level="3"
              textAlign="left"
            >
              <strong>Favorite</strong> Products
            </CardTitle>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </div>
    </ProfileScreen>
  );
};

export default ViewProfileScreen;
