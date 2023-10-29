import SignUpForm from "../Components/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createUser = async (user) => {
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
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
