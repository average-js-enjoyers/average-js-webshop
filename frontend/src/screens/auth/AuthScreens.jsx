import { Link } from "react-router-dom";

import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import Logo from "components/common/Logo";
import Button from "components/common/Button";

import SignUpForm from "components/forms/SignUpForm";
import { handleSignUp } from "api";

import OnboardingForm from "components/forms/OnboardingForm";

import SignInForm from "components/forms/SignInForm";
import GoogleSignInButton from "components/forms/GoogleSignInButton";
import FacebookSignInButton from "components/forms/FacebookSignInButton";
import { signIn } from "api";

function AuthScreen({ route }) {
  const handleSignIn = (user) => {
    signIn(user);
  };

  let screen;
  switch (route) {
    case "signin":
      screen = (
        <Card>
          <CardBody>
            <CardTitle level="1">Sign In</CardTitle>
            <SignInForm onSignIn={handleSignIn} />
            <GoogleSignInButton />
            <FacebookSignInButton />
          </CardBody>
          <CardFooter>
            <p>Don't have a user yet?</p>
            <Link to="/signup">
              <Button variant="link">Sign up here!</Button>
            </Link>
          </CardFooter>
        </Card>
      );
      break;
    case "onboard":
      screen = (
        <Card>
          <CardBody>
            <CardTitle level="1">Welcome to The Shop!</CardTitle>
            <OnboardingForm />
          </CardBody>
          <CardFooter>
            <p>
              Once this is done, <strong>your account will be active</strong>.
            </p>
          </CardFooter>
        </Card>
      );
      break;
    default:
      screen = (
        <Card>
          <CardBody>
            <CardTitle level="1" textAlign="center">
              Sign Up
            </CardTitle>
            <SignUpForm onSignUp={handleSignUp} />
          </CardBody>
          <CardFooter>
            <p>
              Clicking the button will <strong>activate your account</strong>.
            </p>
          </CardFooter>
        </Card>
      );
      break;
  }

  return (
    <div className="auth-screen-wrapper">
      <div className="auth-screen-wrapper__deco auth-screen-wrapper__deco--1"></div>
      <div className="auth-screen">
        <header className="auth-screen__logo">
          <Logo />
        </header>
        <main className="auth-screen__main">{screen}</main>
        <footer className="auth-screen__help">
          <Button variant="outline-secondary">Need Help?</Button>
        </footer>
      </div>
      <div className="auth-screen-wrapper__deco auth-screen-wrapper__deco--2"></div>
    </div>
  );
}

export default AuthScreen;
