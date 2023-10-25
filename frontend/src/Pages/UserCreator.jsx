import SignUpForm from "../Components/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createUser = (user) => {
  return fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

const UserCreator = () => {

  const handleSignUp = (user) => {
    console.log(user)
    createUser(user).then(()=>{
      console.log("this works");
    })
    
  };

  return <SignUpForm onSignUp={handleSignUp} />;
};

export default UserCreator;
