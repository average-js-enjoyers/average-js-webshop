import SignUpForm from "components/forms/SignUpForm";

import { createUser, handleSignUp } from "api";

const SignUpScreen = () => {
  const handleSignUp = (user) => {
    console.log(user);
    createUser(user).then(() => {
      console.log("this works");
    });
  };

  return (
    <main>
      <SignUpForm onSignUp={handleSignUp} />
    </main>
  );
};

export default SignUpScreen;
