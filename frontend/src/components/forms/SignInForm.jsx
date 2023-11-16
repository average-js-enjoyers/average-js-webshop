//src/components/forms/SignInForm.jsx
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "hooks/useAuth";
import AuthContext from "context/AuthContext";

import StatusMessage from "components/common/StatusMessage";

function SignInForm() {
  const { signInWithOwnBackend } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { responseData, clearResponseData } = useContext(AuthContext);

  return (
    <>
      {responseData?.error?.statusCode === 401 && (
        <StatusMessage
          type="danger"
          message="Your email or password is incorrect. Please try again."
          cleanupFunction={() => clearResponseData()}
        />
      )}
      {responseData?.error?.statusCode !== 401 &&
        responseData?.error &&
        responseData !== null && (
          <StatusMessage
            type="danger"
            message={
              "Something went wrong. We are working on it! (Error code " +
              responseData?.error?.statusCode +
              ")"
            }
            cleanupFunction={() => clearResponseData()}
          />
        )}
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOwnBackend(email, password);
        }}
      >
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your e-mail address here"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password here"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign In Now" />
      </form>
    </>
  );
}

export default SignInForm;
