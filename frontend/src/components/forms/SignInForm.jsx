//src/components/forms/SignInForm.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthContext";

function SignInForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [nonHashedPassword, setnonHashedPassword] = useState("");

  const signInError = location.state?.signInError;

  useEffect(() => {
    // Clear any sign-in error from the location state after it's been handled
    if (signInError) {
      // Replace the current entry in the history stack to clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [signInError, navigate, location.pathname]);

  return (
    <>
      {signInError && (
        <div
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            borderColor: "#f5c6cb",
            padding: "0.75rem 1.25rem",
            marginBottom: "1rem",
            border: "1px solid transparent",
            borderRadius: "0.25rem",
            fontSize: "2rem",
            lineHeight: 1.5,
          }}
        >
          Error signing in: {signInError}
        </div>
      )}
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, nonHashedPassword);
        }}
      >
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
          />
        </div>

        <div>
          <label htmlFor="nonHashedPassword">Password:</label>
          <input
            type="password"
            onChange={(e) => setnonHashedPassword(e.target.value)}
            name="nonHashedPassword"
            id="nonHashedPassword"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign In Now" />
      </form>
    </>
  );
}

export default SignInForm;
