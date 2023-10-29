import SignUpForm from "../Components/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../api";

const UserCreator = () => {
  const handleSignUp = (user) => {
    console.log(user);
    createUser(user).then(() => {
      console.log("this works");
    });
  };

  return <SignUpForm onSignUp={handleSignUp} />;
};

export default UserCreator;
