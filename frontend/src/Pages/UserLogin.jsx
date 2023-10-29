import React from "react";
import LogInForm from "../Components/LogInForm";

const logUserIn = (user) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

function UserLogin() {
  const handleLogIn = (user) => {
    logUserIn(user);
  };

  return <LogInForm onSignIn={handleLogIn} />;
}

export default UserLogin;
