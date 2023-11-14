import { useLocation } from "react-router-dom";
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

export default function OnboardingScreen() {
  // Get token from URL which goes like /onboard/:token
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  // Put token in session storage
  sessionStorage.setItem("accessToken", token);

  return (
    <Card>
      <CardHeader>
        <CardLogo>
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
