//src/screens/auth/SignInScreen.jsx
import SignInForm from "components/forms/SignInForm";

import GoogleSignInButton from "components/forms/GoogleSignInButton";
import FacebookSignInButton from "components/forms/FacebookSignInButton";

import { signIn } from "api";

function SignInScreen() {
  const handleSignIn = (user) => {
    signIn(user);
  };

  return (
    <>
      <SignInForm onSignIn={handleSignIn} />
      <GoogleSignInButton />
      <FacebookSignInButton />
    </>
  );
}

export default SignInScreen;
