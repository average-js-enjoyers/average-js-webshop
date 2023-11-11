// src/components/auth/OAuthCallbackScreen.jsx
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import oauthConfig from "utils/oauthConfig";

import Logo from "components/common/Logo";

function OAuthCallbackScreen({ provider }) {
  const navigate = useNavigate();
  const { signInWithProviderToken } = useAuth();

  // TODO - Do something with the codeVerifier
  const codeVerifier = sessionStorage.getItem(`${provider}CodeVerifier`);
  sessionStorage.removeItem(`${provider}CodeVerifier`);

  const { clientId, clientSecret, redirectUri, tokenExchangeUrl } =
    oauthConfig[provider];

  // Abstracted logic for exchanging tokens
  const exchangeCodeForTokens = useCallback(
    async (code, codeVerifier, state, innerState) => {
      const grant_type = "authorization_code";

      try {
        const response = await fetch(tokenExchangeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type,
            code_verifier: codeVerifier,
            redirect_uri: redirectUri,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `Failed to exchange code for tokens with ${provider}.`
          );
        }

        console.log(innerState, typeof innerState, state, typeof state);
        if (state !== innerState) {
          throw new Error(
            `State does not match. Possible CSRF attack with ${provider}.`
          );
        }
        sessionStorage.removeItem(`${provider}State`);

        // Call the respective signIn function from context
        signInWithProviderToken(
          provider,
          data.access_token,
          data.refresh_token
        );
      } catch (error) {
        console.error(`Error during ${provider} token exchange:`, error);
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [
      clientId,
      clientSecret,
      navigate,
      redirectUri,
      tokenExchangeUrl,
      signInWithProviderToken,
      provider,
    ]
  );

  // The below useEffect hook will run only once when the component mounts. It will check if the URL contains a code and codeVerifier. If it does, it will call the exchangeCodeForTokens function with the code and codeVerifier as arguments. It will also remove the codeVerifier from sessionStorage. It returns a cleanup function that sets isSubscribed to false, which will prevent the exchangeCodeForTokens function from being called if the component unmounts before the code and codeVerifier are retrieved from the URL. This is a common pattern for handling asynchronous operations in useEffect hooks. We can't use async/await directly in useEffect hooks, so we have to use this pattern instead. We also have to pass exchangeCodeForTokens as a dependency to the useEffect hook, since it is defined outside of the hook. This is another common pattern for handling asynchronous operations in useEffect hooks.
  useEffect(() => {
    let isSubscribed = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const codeVerifier = sessionStorage.getItem("codeVerifier");
    const state = params.get("state");
    const innerState = sessionStorage.getItem(`${provider}State`);

    // Set a timeout to wait for 1 second
    const timeoutId = setTimeout(() => {
      if (code && codeVerifier && isSubscribed) {
        exchangeCodeForTokens(code, codeVerifier, state, innerState);
        sessionStorage.removeItem("codeVerifier");
      }
    }, 1500); // 1500 milliseconds = 1.5 seconds

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [exchangeCodeForTokens]);

  return (
    <div className="auth-callback-loader">
      <Logo logoSize="small" />
      <div className="loader"></div>
      <p>
        Signing you in. <br /> Just a sec...
      </p>
    </div>
  );
}

export default OAuthCallbackScreen;
