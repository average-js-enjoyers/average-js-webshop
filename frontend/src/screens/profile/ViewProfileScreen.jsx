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
        <Card className={"user-details-summary"} dropShade={true} deco={true}>
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
          <CardBody></CardBody>
        </Card>
        <div className="shipping-billing-container">
          <Card
            className={"shipping-address-list-summary"}
            dropShade={true}
            deco={true}
          >
            <CardHeader align="start">
              <CardTitle
                className={"shipping-address-list-summary__title"}
                level="3"
                textAlign="left"
              >
                <strong>Shipping</strong> Addresses
              </CardTitle>
            </CardHeader>
            <CardBody></CardBody>
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
          <Card
            className={"billing-address-list-summary"}
            dropShade={true}
            deco={true}
          >
            <CardHeader align="start">
              <CardTitle
                className={"billing-address-list-summary__title"}
                level="3"
                textAlign="left"
              >
                <strong>Billing</strong> Addresses
              </CardTitle>
            </CardHeader>
            <CardBody></CardBody>
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
