import QuickSignUpForm from "components/forms/QuickSignUpForm";

import { handleSignUp } from "api";

const QuickSignUpScreen = () => {
  return <QuickSignUpForm onSignUp={handleSignUp} />;
};

export default QuickSignUpScreen;