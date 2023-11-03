import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      console.error(
        "The code and/or state parameters are missing from the URL."
      );
      navigate("/signin");
      return;
    }

    // TODO: Verify the state parameter here against what was stored prior to redirect
    // This is crucial for security (CSRF protection)

    exchangeCodeForTokens(code);
  }, [navigate]);

  const exchangeCodeForTokens = async (code) => {
    // const client_id = "407408718192.apps.googleusercontent.com"; // Replace with your client ID
    const client_id =
      "1053966644924-fornicn3hjv71v74tshvep32sa6u7erl.apps.googleusercontent.com"; // Replace with your client ID
    const client_secret = "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"; // Replace with your client secret
    const grant_type = "authorization_code";
    const code_verifier = sessionStorage.getItem("codeVerifier");

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // URLSearchParams will correctly encode the parameters for the x-www-form-urlencoded content type
        body: new URLSearchParams({
          code,
          client_id,
          client_secret,
          grant_type,
          code_verifier,
          redirect_uri: "http://localhost:3000/oauth/google",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to exchange code for tokens.");
      }

      console.log(response, data);

      // Here you can store the tokens in the appropriate place
      // For example, in session storage, local storage, or manage it in Redux, etc.
      // Remember to handle them securely
      // Store the tokens. For example, in session storage:
      sessionStorage.setItem("accessToken", data.access_token);
      // If there is a refresh token
      if (data.refresh_token) {
        sessionStorage.setItem("refreshToken", data.refresh_token);
      }

      console.log("User is authenticated", data);
      navigate("/"); // Redirect to the homepage or dashboard on success
    } catch (error) {
      console.error("Error during token exchange:", error);
      navigate("/signin");
    }
  };

  return <div>Logging you in...</div>;
};

export default GoogleCallback;
