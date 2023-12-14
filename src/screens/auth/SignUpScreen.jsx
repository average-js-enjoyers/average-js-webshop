import { useAuth } from "hooks";

import SignUpForm from "components/forms/SignUpForm";
import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import Button from "components/common/Button";
import OAuthButtons from "components/common/OAuthButtons";

import { PersonPlusFill } from "react-bootstrap-icons";

export default function SignUpScreen() {
  const { signUp, signInWithProvider } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardLogo className="card__logo--auth">
          <PersonPlusFill color="var(--secondary-90)" />
        </CardLogo>
        <CardTitle level="1" textAlign="center">
          Sign Up Now
        </CardTitle>
      </CardHeader>
      <CardBody>
        <SignUpForm onSignUp={signUp} />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <strong>Or Sign Up simply with:</strong>
        </p>
        <OAuthButtons />
      </CardFooter>
    </Card>
  );
}
