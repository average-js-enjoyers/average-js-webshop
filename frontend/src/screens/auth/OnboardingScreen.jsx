import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import OnboardingForm from "components/forms/On_boardingForm";

import { BrightnessAltHighFill } from "react-bootstrap-icons";

import AuthContext from "context/AuthContext";

export default function OnboardingScreen() {
  // Get token from URL which goes like /onboard/:token
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  const authContext = useContext(AuthContext);
  console.log(authContext);

  // Put token in session storage
  if (
    !authContext.isAuthenticated ||
    authContext.isAuthenticated === "loading"
  ) {
    sessionStorage.setItem("accessToken", token);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      navigate("/signin");
    }
  }, [authContext, navigate]);

  useEffect(() => {
    // Listen for changes in emailConfirmed
    if (authContext.user?.emailConfirmed === true) {
      navigate("/"); // Redirect to home
      if (authContext.user?.emailConfirmed === false) {
        sessionStorage.setItem("onboardSuccess", true);
      }
    }
  }, [authContext.user?.emailConfirmed, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardLogo className="card__logo--auth">
          <BrightnessAltHighFill color="var(--secondary-90)" />
        </CardLogo>
        <CardTitle level="1" textAlign="center">
          Let's Get On Board!
        </CardTitle>
        <p className="lead text-center">
          Let’s sort out some basic details in a minute.
        </p>
      </CardHeader>
      <CardBody>
        <OnboardingForm />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          Once this is done, your account will be active.
          <br />
          <strong>You can start shopping right away!</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
