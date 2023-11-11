//src/hooks/useAuth.js

import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";
// import { signInWithApi, signOutFromApi } from "api"; // You'll define these
import {
  generateRandomStateValue,
  generateCodeChallenge,
  generateCodeVerifier,
  getAuthUrl,
} from "utils/oauthHelpers";

import { fetchUserInfoAndGetNewToken } from "api";
import { createUser } from "api";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = useCallback(
    async (email, password) => {
      let response = null;
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailAddress: email, password }),
        });

        const res = await response.json();
        if (!response.ok) {
          throw new Error(res.error || "Failed to exchange code for tokens.");
        }

        const { user: userInfo, token } = res.data;
        authContext.setAuthInfo({ user: userInfo });
        sessionStorage.setItem("accessToken", token);

        navigate("/auth/internal");
      } catch (error) {
        console.error("Error during signIn:", error, "Response:", response);

        if (response?.status === 401) {
          console.log(
            "Login failed: Unauthorized. Please check your credentials."
          );
          authContext.setResponseData(response);
        } else {
          throw error;
        }
      }
    },
    [navigate, authContext]
  );

  const signInWithProvider = useCallback((provider) => {
    const state = generateRandomStateValue();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Save the state and codeVerifier in sessionStorage or other secure place to use later
    sessionStorage.setItem(`${provider}State`, state);
    sessionStorage.setItem(`${provider}CodeVerifier`, codeVerifier);

    const authUrl = getAuthUrl(provider, state, codeChallenge);
    window.location.href = authUrl;
  }, []);

  const signInWithProviderToken = useCallback(
    async (provider, accessToken, refreshToken) => {
      try {
        const userInfo = await fetchUserInfoAndGetNewToken(
          provider,
          accessToken
        );

        authContext.setAuthInfo({ user: userInfo });

        if (!userInfo.emailConfirmed) {
          navigate("/onboard", { replace: true });
        } else {
          navigate("/", { state: { signInSuccess: true } });
        }
      } catch (error) {
        console.error(`Error during sign-in with ${provider} token:`, error);
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [navigate, authContext]
  );

  const signUp = useCallback(
    async (user) => {
      try {
        const data = await createUser(user);
        // Maybe sign in the user directly or set some state to confirm registration
        // TODO - Implement sign in after sign up
        if (data.error) {
          throw new Error(data.error);
        }
        navigate("/confirm-registration", { state: { signUpSuccess: true } });
      } catch (error) {
        // handle error
        console.error(error);
      }
    },
    [navigate]
  );

  const signOut = useCallback(() => {
    // Clear the application session
    sessionStorage.removeItem("accessToken");
    authContext.clearAuthInfo();
    // Redirect to the sign-in page or home page
    navigate("/", { replace: true, state: { signOutSuccess: true } });

    // Optionally, sign out from Google too. Uncomment the following line if needed.
    // window.location.href = 'https://accounts.google.com/Logout';
  }, [navigate, authContext /* authContext.setAuthInfo */]);

  return {
    ...authContext,
    signUp,
    signIn,
    signInWithProvider,
    signInWithProviderToken,
    signOut,
  };
};
