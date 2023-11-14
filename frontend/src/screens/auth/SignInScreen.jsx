import { Link, useLocation } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import StatusMessage from "components/common/StatusMessage";
import Button from "components/common/Button";

import SignInForm from "components/forms/SignInForm";

import { PersonCheckFill } from "react-bootstrap-icons";

import { useAuth } from "hooks/useAuth";

export default function SignInScreen() {
  const { signInWithProvider } = useAuth();
  const location = useLocation();

  const oauthError = location.state?.oauthError || null;

  return (
    <>
      {oauthError && <StatusMessage type="danger" message={oauthError} />}
      <Card>
        <CardBody>
          <CardHeader>
            <CardLogo>
              <PersonCheckFill color="var(--secondary-90)" />
            </CardLogo>
            <CardTitle level="1" textAlign="center">
              Sign In Now
            </CardTitle>
          </CardHeader>
          <SignInForm />

          <p className="mt-3 text-center">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
          <hr className="mt-3" />
          <p className="mt-3 text-center">
            <strong>Or sign in simply with:</strong>
          </p>
          <div className="oauth-button-wrapper mt-3">
            <Button
              variant="outline-danger btn--compact"
              onClick={() => signInWithProvider("google")}
            >
              Google Sign In
            </Button>
            <Button
              variant="outline-info btn--compact"
              onClick={() => signInWithProvider("facebook")}
            >
              Facebook Sign In
            </Button>
          </div>
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
