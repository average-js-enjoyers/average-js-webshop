import { useLocation } from "react-router-dom";
import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import OnboardingForm from "components/forms/OnboardingForm";

export default function OnboardingScreen() {
  // Get token from URL which goes like /onboard/:token
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  // Put token in session storage
  sessionStorage.setItem("accessToken", token);

  // TODO - Remove token from URL. This will need an extra step of redirecting to /onboard and then to /onboard/:token
  /*   const navigate = useNavigate();
    navigate("/onboard", { replace: true }); */

  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          <span className="emoji-logo emoji-logo--display">⚡</span> <br />
          Welcome On Board!
        </CardTitle>
        <p className="lead text-center mt-2 mb-2">
          Let’s sort out some basic details in a minute.
        </p>
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
