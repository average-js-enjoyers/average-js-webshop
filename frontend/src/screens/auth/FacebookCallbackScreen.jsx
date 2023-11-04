//src/screens/auth/FacebookCallbackScreen.jsx
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import {
  facebookAppId,
  facebookAppSecret,
  facebookRedirectUri,
} from "utils/oauthHelpers";

function FacebookCallbackScreen() {
  const navigate = useNavigate();
  const { signInWithFacebookToken } = useAuth();

  // Extract the logic for exchanging tokens into a useCallback
  const exchangeCodeForTokens = useCallback(
    async (code, codeVerifier) => {
      const grant_type = "authorization_code";

      try {
        const response = await fetch(
          "https://graph.facebook.com/v18.0/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: facebookAppId,
              redirect_uri: facebookRedirectUri,
              client_secret: facebookAppSecret,
              code,
              grant_type,
              code_verifier: codeVerifier,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to exchange code for tokens.");
        }

        // Pass the token to the signInWithFacebookToken function from context to handle state update
        signInWithFacebookToken(data.access_token, data.refresh_token);
      } catch (error) {
        console.error("Error during token exchange:", error);
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [navigate, signInWithFacebookToken]
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

export default FacebookCallbackScreen;
