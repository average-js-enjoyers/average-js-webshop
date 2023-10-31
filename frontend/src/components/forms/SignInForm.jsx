import { useState } from "react";

function SignInForm({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [nonHashedPassword, setnonHashedPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSignUp({
      emailAddress: email,
      password: nonHashedPassword,
    });
  };

  return (
    <form className="SignUpFields" onSubmit={handleSubmit}>
      <div className="control">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="nonHashedPassword">Password:</label>
        <input
          type="password"
          onChange={(e) => setnonHashedPassword(e.target.value)}
          name="nonHashedPassword"
          id="nonHashedPassword"
        />
      </div>

      <div className="button">
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
}

export default SignInForm;
