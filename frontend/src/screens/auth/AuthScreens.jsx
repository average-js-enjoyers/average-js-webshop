import { Link } from "react-router-dom";

import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import Logo from "components/common/Logo";
import Button from "components/common/Button";

import SignUpForm from "components/forms/SignUpForm";

import OnboardingForm from "components/forms/OnboardingForm";

import SignInForm from "components/forms/SignInForm";
// import { signIn } from "api";

// import { useAuth } from "context/AuthContext";
import { useAuth } from "hooks/useAuth";

function AuthScreen({ route }) {
  let screen;
  switch (route) {
    case "signin":
      screen = <SignInScreen />;
      break;
    case "onboard":
      screen = <OnboardScreen />;
      break;
    case "signup":
      screen = <SignUpScreen />;
      break;
    default:
      screen = <ConfirmRegistrationScreen />;
      break;
  }

  return <AuthScreenWrapper>{screen}</AuthScreenWrapper>;
}

function AuthScreenWrapper({ children }) {
  return (
    <div className="auth-screen-wrapper">
      <div className="auth-screen-wrapper__deco auth-screen-wrapper__deco--1"></div>
      <div className="auth-screen">
        <header className="auth-screen__logo">
          <Logo />
        </header>
        <main className="auth-screen__main">{children}</main>
        <footer className="auth-screen__help">
          <Button variant="outline-secondary">Need Help?</Button>
        </footer>
      </div>
      <div className="auth-screen-wrapper__deco auth-screen-wrapper__deco--2"></div>
    </div>
  );
}

function SignInScreen() {
  const { signInWithProvider } = useAuth();

  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          Sign In
        </CardTitle>
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
        <p>
          You can <Link to="/signup">sign up now</Link> in 2 minutes.
        </p>
      </CardFooter>
    </Card>
  );
}

function OnboardScreen() {
  return (
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
}

function SignUpScreen() {
  const { signUp, signInWithProvider } = useAuth();

  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          Sign Up
        </CardTitle>
        <SignUpForm onSignUp={signUp} />
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <strong>Or sign up simply with:</strong>
        </p>
        <div className="oauth-button-wrapper mt-2">
          <Button
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

function ConfirmRegistrationScreen() {
  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          Confirm Registration
        </CardTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "90%",
            gap: "3rem",
          }}
        >
          <p
            className="text-center"
            style={{ fontWeight: "500", fontSize: "1.6rem" }}
          >
            We’ve sent you an email. <br />
            You can finalise your registration by clicking <br />
            the link in the email.
          </p>
          <p className=" text-center">
            Once you’ve clicked the link, you can sign in.
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <p
          className="text-center"
          style={{ fontWeight: "300", fontSize: "1.6rem" }}
        >
          Didn't get the email?
        </p>
        <p className="mt-1 text-center">
          <Link to="/resend-confirmation">Resend my confirmation email!</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default AuthScreen;
