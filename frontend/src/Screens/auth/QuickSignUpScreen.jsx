import QuickSignUpForm from "components/forms/QickSignUpForm";

import { createUser } from "api";

const SignUpScreen = () => {
  const handleSignUp = (user) => {
    console.log(user);
    createUser(user).then(() => {
      console.log("this works");
    });
  };

  return (
    <main>
      <QuickSignUpForm onSignUp={handleSignUp} />
    </main>
  );
};

export default SignUpScreen;
