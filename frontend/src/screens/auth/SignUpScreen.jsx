import { useAuth } from "hooks";

import SignUpForm from "components/forms/SignUpForm";
import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import Button from "components/common/Button";

export default function SignUpScreen() {
  const { signUp, signInWithProvider } = useAuth();

  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          <span className="emoji-logo emoji-logo--display">🎀</span> <br />
          Sign Up Now
        </CardTitle>
        <SignUpForm onSignUp={signUp} />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <strong>Or Sign Up simply with:</strong>
        </p>
        <div className="oauth-button-wrapper mt-2">
          <Button
            className="mr-2"
            variant="outline-danger"
            onClick={() => signInWithProvider("google")}
          >
            Google
          </Button>

          <Button
            variant="outline-info "
            onClick={() => signInWithProvider("facebook")}
          >
            Facebook
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
