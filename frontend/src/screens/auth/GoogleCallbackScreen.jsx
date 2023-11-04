//src/screens/auth/GoogleCallbackScreen.jsx
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import { clientId, clientSecret, redirectUri } from "utils/oauthHelpers";

function GoogleCallbackScreen() {
  const navigate = useNavigate();
  const { signInWithGoogleToken } = useAuth();

  // Extract the logic for exchanging tokens into a useCallback
  const exchangeCodeForTokens = useCallback(
    async (code, codeVerifier) => {
      const grant_type = "authorization_code";

      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code,
            clientId,
            clientSecret,
            grant_type,
            codeVerifier,
            redirectUri,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to exchange code for tokens.");
        }

        // Pass the token to the signInWithGoogleToken function from context to handle state update
        signInWithGoogleToken(data.access_token, data.refresh_token);
      } catch (error) {
        console.error("Error during token exchange:", error);
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [navigate, signInWithGoogleToken]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // code = Authorization code
    const code = params.get("code");

    const codeVerifier = sessionStorage.getItem("codeVerifier");
    sessionStorage.removeItem("codeVerifier");

    if (!code) {
      console.error(
        "The code parameters are missing, or state does not match."
      );
      navigate("/signin");
      return;
    }

    // Proceed to exchange the code for tokens
    exchangeCodeForTokens(code, codeVerifier);
  }, [exchangeCodeForTokens, navigate]);

  return <div>Logging you in...</div>;
}

export default GoogleCallbackScreen;
