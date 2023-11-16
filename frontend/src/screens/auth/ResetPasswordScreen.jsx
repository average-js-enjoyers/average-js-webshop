import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordForm from "components/forms/ResetPasswordForm";
import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import { ShieldLock } from "react-bootstrap-icons";
import { useAuth } from "hooks";

function ResetPasswordScreen() {
  // Get token from URL which goes like /onboard/:token
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  sessionStorage.setItem("resetPwdToken", token);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  useEffect(() => {
    // Listen for changes in emailConfirmed
    if (isAuthenticated === true) {
      navigate("/"); // Redirect to home
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardLogo>
          <ShieldLock color="var(--secondary-90)" />
        </CardLogo>
        <CardTitle level="1" textAlign="center">
          Reset Your Password
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p className="lead text-center">Please enter your new password.</p>
        <ResetPasswordForm className="mt-3" />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          After resetting your password, <br /> you will be redirected to the
          Sign In screen.
        </p>
      </CardFooter>
    </Card>
  );
}

export default ResetPasswordScreen;
