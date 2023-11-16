import Logo from "components/common/Logo";
import Button from "components/common/Button";

import SignUpScreen from "screens/auth/SignUpScreen";
import ConfirmRegistrationScreen from "screens/auth/ConfirmRegistrationScreen";
import OnboardingScreen from "screens/auth/OnboardingScreen";
import SignInScreen from "screens/auth/SignInScreen";
import ForgotPasswordScreen from "screens/auth/ForgotPasswordScreen";
import AdminSignInScreen from "screens/auth/AdminSignInScreen";

function AuthScreen({ route }) {
  let screen;
  switch (route) {
    case "signin":
      screen = <SignInScreen />;
      break;
    case "onboard":
      screen = <OnboardingScreen />;
      break;
    case "admin-signin":
      screen = <AdminSignInScreen />;
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

export default AuthScreen;
