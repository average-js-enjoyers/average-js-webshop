//src/components/forms/SignInForm.jsx
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "hooks/useAuth";
import AuthContext from "context/AuthContext";

import { FormValidationMessageWrapper } from "components/forms/FormValidationMessage";

function SignInForm() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { responseData } = useContext(AuthContext);

  const messages = [
    {
      id: 1,
      text: "Your email or password is incorrect. Please try again.",
      type: "danger",
      isVisible: responseData?.status === 401,
    },
  ];

  return (
    <>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, password);
        }}
      >
        <FormValidationMessageWrapper messages={messages} />
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="Enter your e-mail address here"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="Enter your password here"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign In Now" />
      </form>
    </>
  );
}

export default SignInForm;
