import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "components/forms/ForgotPasswordForm";

export default function ForgotPasswordScreen() {
  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          <span className="emoji-logo emoji-logo--display">🔑</span> <br />
          Forgot Password
        </CardTitle>
        <p className="lead text-center mt-2 mb-2">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <ForgotPasswordForm />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <Link to="/signin">Return to Sign In</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
