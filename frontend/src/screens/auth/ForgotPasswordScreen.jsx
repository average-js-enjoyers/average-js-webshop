import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "components/forms/ForgotPasswordForm";

import { KeyFill } from "react-bootstrap-icons";

export default function ForgotPasswordScreen() {
  return (
    <Card>
      <CardHeader>
        <CardLogo>
          <KeyFill color="var(--secondary-90)" />
        </CardLogo>
        <CardTitle level="1" textAlign="center">
          Forgot Your Password?
        </CardTitle>
      </CardHeader>
      <CardBody>
        <p className="lead text-center">
          <strong className="lead">Let's get you a new one.</strong> <br />{" "}
          <br />
          Enter your email address and we’ll send you a password reset link.
        </p>
        <ForgotPasswordForm className="mt-3" />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <Link to="/signin">Return to Sign In</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
