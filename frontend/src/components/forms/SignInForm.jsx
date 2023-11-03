import { useState } from "react";
import GoogleSignInButton from "components/forms/GoogleSignInButton";

import jsSHA from "jssha";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignInForm({ onSignUp }) {
  const location = useLocation();
  const navigate = useNavigate();
  const signInError = location.state?.signInError;

  useEffect(() => {
    // Clear any sign-in error from the location state after it's been handled
    if (signInError) {
      // Replace the current entry in the history stack to clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [signInError, navigate, location.pathname]);

  const [email, setEmail] = useState("");
  const [nonHashedPassword, setnonHashedPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSignUp({
      emailAddress: email,
      password: nonHashedPassword,
    });
  };

  // You might need to use a more secure random generator for production code
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateCodeVerifier = () => {
    // The code verifier should be between 43 and 128 characters long
    const codeVerifier = generateRandomString(43);
    sessionStorage.setItem("codeVerifier", codeVerifier);
    return codeVerifier;
  };

  const generateCodeChallenge = (codeVerifier) => {
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(codeVerifier);
    const hash = shaObj.getHash("HEX");
    return base64urlencode(hash);
  };

  // Helper function to Base64URL encode a string
  const base64urlencode = (str) => {
    // Convert the hex string to a Base64 string
    const base64 = btoa(
      String.fromCharCode.apply(
        null,
        str.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      )
    );
    // Replace non-URL-safe characters with their URL-safe equivalents
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  // TODO - Implement higher security for Google Sign In
  const handleSignInClick = () => {
    function generateAuthUrl({
      clientId,
      redirectUri,
      scope,
      state,
      responseType = "code",
      codeChallenge,
      prompt = "consent",
      accessType = "offline",
      codeChallengeMethod = "S256",
    }) {
      // Construct the base URL with required query parameters
      const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
        state: state,
        response_type: responseType,
        prompt: prompt,
        access_type: accessType,
        code_challenge: codeChallenge,
        code_challenge_method: codeChallengeMethod,
      });

      // Return the full authentication URL
      return `${baseUrl}?${params.toString()}`;
    }

    // Usage:
    const options = {
      clientId:
        "1053966644924-fornicn3hjv71v74tshvep32sa6u7erl.apps.googleusercontent.com",
      redirectUri: "http://localhost:3000/oauth/google",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      state: generateRandomStateValue(),
      codeChallenge: generateCodeChallenge(generateCodeVerifier()),
    };

    const authUrl = generateAuthUrl(options);

    window.location.href = authUrl;

    console.log(authUrl);
  };

  const generateRandomStateValue = () => {
    // Replace this with your method of generating a random string
    return Math.random().toString(36).substring(2, 15);
  };

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
      <form className="" onSubmit={handleSubmit}>
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

        <div className="button">
          <button type="submit">Sign In</button>
        </div>
      </form>

      <GoogleSignInButton onSignIn={handleSignInClick} />
    </>
  );
}

export default SignInForm;
