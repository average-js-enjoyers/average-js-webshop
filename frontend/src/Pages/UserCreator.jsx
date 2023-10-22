import SignUp from "../Components/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createUser = (user) => {
  return fetch("DONTLEAVEMEHERE", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

const UserCreator = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(loading);

  const handleSignUp = (user) => {
    return setLoading(true);
  };

  return <SignUp onSignUp={handleSignUp} />;
};

export default UserCreator;
