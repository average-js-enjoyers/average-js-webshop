//src/components/forms/SignInForm.jsx
import { useState } from "react";

import { useAuth } from "hooks/useAuth";

function SignInForm() {
  const { signInWithOwnBackend } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
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
