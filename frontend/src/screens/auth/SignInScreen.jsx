import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import StatusMessage from "components/common/StatusMessage";
import OAuthButtons from "components/common/OAuthButtons";

import SignInForm from "components/forms/SignInForm";

import { PersonCheckFill } from "react-bootstrap-icons";
import { useAuth } from "hooks";
import { useEffect } from "react";

export default function SignInScreen() {
  const location = useLocation();

  const oauthError = location.state?.oauthError || null;

  const authContext = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.isAuthenticated) {
      navigate("/");
    }
  }, [authContext, navigate]);

  return (
    <>
      {oauthError && <StatusMessage type="danger" message={oauthError} />}
      <Card>
        <CardHeader>
          <CardLogo>
            <PersonCheckFill color="var(--secondary-90)" />
          </CardLogo>
          <CardTitle level="1" textAlign="center">
            Sign In Now
          </CardTitle>
        </CardHeader>
        <CardBody>
          <SignInForm />
          <p className="mt-3 text-center">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
          <hr className="mt-3" />
          <p className="mt-3 text-center">
            <strong>Or sign in simply with:</strong>
          </p>
          <OAuthButtons />
        </CardBody>
        <CardFooter>
          <p className="text-center">
            You can also{" "}
            <Link style={{ fontWeight: "700" }} to="/signup">
              Sign Up Now
            </Link>{" "}
            in 2 minutes, <br /> without any Google or Facebook account.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
