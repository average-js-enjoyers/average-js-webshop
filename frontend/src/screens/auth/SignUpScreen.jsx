import SignUpForm from "components/forms/SignUpForm";

import { handleSignUp } from "api";

const SignUpScreen = () => {
  return <SignUpForm onSignUp={handleSignUp} />;
};

export default SignUpScreen;
