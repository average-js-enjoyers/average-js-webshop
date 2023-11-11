import { Link, useLocation } from "react-router-dom";

import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import Logo from "components/common/Logo";
import Button from "components/common/Button";

import SignUpForm from "components/forms/SignUpForm";

import OnboardingForm from "components/forms/OnboardingForm";

import SignInForm from "components/forms/SignInForm";

import { useAuth } from "hooks/useAuth";

import StatusMessage from "components/common/StatusMessage";

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
    case "forgot-password":
      screen = <ForgotPasswordScreen />;
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
          <Button variant="danger">Need Help?</Button>
        </footer>
      </div>
      <div className="auth-screen-wrapper__deco auth-screen-wrapper__deco--2"></div>
    </div>
  );
}

function SignUpScreen() {
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

function ConfirmRegistrationScreen() {
  return (
    <Card>
      <CardBody>
        <CardTitle level="1" textAlign="center">
          <span className="emoji-logo emoji-logo--display">📨</span> <br />
          Confirm Your Registration
        </CardTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "3rem",
          }}
        >
          <p
            className="text-center"
            style={{ fontWeight: "500", fontSize: "1.6rem" }}
          >
            We’ve sent you an email. <br />
            You can finalise your registration by clicking{" "}
            <br className="d-none-sm" />
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

function OnboardScreen() {
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

function SignInScreen() {
  const { signInWithProvider } = useAuth();
  const location = useLocation();

  const oauthError = location.state?.oauthError || null;

  return (
    <>
      {oauthError && <StatusMessage type="danger" message={oauthError} />}
      <Card>
        <CardBody>
          <CardTitle level="1" textAlign="center">
            <span className="emoji-logo emoji-logo--display">✨</span> <br />
            Sign In Now
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

function ForgotPasswordScreen() {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // TODO - send reset link
          }}
        >
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <Button variant="primary btn-block mt-3">Send Reset Link</Button>
        </form>
      </CardBody>
      <CardFooter>
        <p className="text-center">
          <Link to="/signin">Return to Sign In</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default AuthScreen;
