// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { createUser as apiCreateUser, signIn as apiSignIn } from "api";
import {
  clientId,
  facebookAppId,
  redirectUri,
  facebookRedirectUri,
  scope,
  facebookScope,
  getGoogleAuthUrl,
  generateRandomStateValue,
  generateCodeChallenge,
  generateCodeVerifier,
  getFacebookAuthUrl,
} from "utils/oauthHelpers";

import { fetchUserInfoAndGetNewToken } from "api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const signInWithGoogle = useCallback(() => {
    // TODO - Implement higher security for Google Sign In
    const state = generateRandomStateValue();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const authUrl = getGoogleAuthUrl({
      clientId,
      redirectUri,
      scope,
      codeChallenge,
    });

    window.location.href = authUrl;

    // TODO - Remove later
    console.log(authUrl);
  }, []);

  // This function will be called after successfully receiving tokens from Google
  const signInWithGoogleToken = useCallback(
    async (accessToken, refreshToken) => {
      try {
        // Here you would use the access token to get the user's profile information
        // from your backend or directly from Google, depending on your setup.
        // For example, you could send a request to your backend with the accessToken,
        // and your backend would then verify the token with Google and return the user information.
        // This is just a placeholder for where that logic would go.

        // TODO - Implement backend fetch
        const userInfo = await fetchUserInfoAndGetNewToken(
          "google",
          accessToken
        );

        // Update the auth state with the user info received from your backend
        setAuthState({ isAuthenticated: true, user: userInfo });

        if (!userInfo.emailConfirmed) {
          navigate("/onboard", { replace: true });
        } else {
          // Redirect the user to the homepage or dashboard on successful sign-in
          navigate("/", { state: { signInSuccess: true } });
        }
      } catch (error) {
        console.error("Error during sign-in with Google token:", error);
        // You may want to navigate to an error page or display an error message
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [navigate]
  );

  const signInWithFacebook = useCallback(() => {
    // TODO - Implement higher security for Google Sign In
    const state = generateRandomStateValue();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const authUrl = getFacebookAuthUrl({
      facebookAppId,
      facebookRedirectUri,
      state,
      facebookScope,
      codeChallenge,
    });

    window.location.href = authUrl;

    // TODO - Remove later
    console.log(authUrl);
  }, []);

  // This function will be called after successfully receiving tokens from Facebook
  const signInWithFacebookToken = useCallback(
    async (accessToken, refreshToken) => {
      try {
        // Here you would use the access token to get the user's profile information
        // from your backend or directly from Facebook, depending on your setup.
        // For example, you could send a request to your backend with the accessToken,
        // and your backend would then verify the token with Facebook and return the user information.
        // This is just a placeholder for where that logic would go.

        // TODO - Implement backend fetch
        const userInfo = await fetchUserInfoAndGetNewToken(
          "facebook",
          accessToken
        );

        // Update the auth state with the user info received from your backend
        setAuthState({ isAuthenticated: true, user: userInfo });

        if (!userInfo.emailConfirmed) {
          navigate("/onboard", { replace: true });
        } else {
          // Redirect the user to the homepage or dashboard on successful sign-in
          navigate("/", { state: { signInSuccess: true } });
        }
      } catch (error) {
        console.error("Error during sign-in with Facebook token:", error);
        // You may want to navigate to an error page or display an error message
        navigate("/signin", { state: { signInError: error.message } });
      }
    },
    [navigate]
  );

  const signIn = useCallback(
    async (email, password) => {
      const user = {
        emailAddress: email,
        password: password,
      };

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const res = await response.json();
        const userInfo = res.data.user;

        if (!response.ok) {
          throw new Error(res.error || "Failed to exchange code for tokens.");
        }

        setAuthState({ isAuthenticated: true, user: userInfo });
        sessionStorage.setItem("accessToken", res.token);

        if (!userInfo.emailConfirmed) {
          navigate("/onboard", { replace: true });
        } else {
          // Redirect the user to the homepage or dashboard on successful sign-in
          navigate("/", { state: { signInSuccess: true } });
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error during signIn:", error);
        throw error; // Rethrow the error if you want to handle it at a higher level
      }
    },
    [navigate]
  );

  const signUp = useCallback(
    async (user) => {
      try {
        const data = await apiCreateUser(user);
        // Maybe sign in the user directly or set some state to confirm registration
        navigate("/signin", { state: { signUpSuccess: true } });
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
    setAuthState({ isAuthenticated: false, user: null });
    // Redirect to the sign-in page or home page
    navigate("/", { replace: true, state: { signOutSuccess: true } });

    // Optionally, sign out from Google too. Uncomment the following line if needed.
    // window.location.href = 'https://accounts.google.com/Logout';
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signInWithGoogle,
        signInWithGoogleToken,
        signInWithFacebook,
        signInWithFacebookToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
