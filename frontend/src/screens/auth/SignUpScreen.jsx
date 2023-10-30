import SignUpForm from "components/forms/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <SignUpForm onSignUp={handleSignUp} />
    </main>
  );
};

export default SignUpScreen;
