import SignInForm from "components/forms/SignInForm";

import { signIn } from "api";

function SignInScreen() {
  const handleLogIn = (user) => {
    signIn(user);
  };

  return <SignInForm onSignIn={handleLogIn} />;
}

export default SignInScreen;
