// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchUserData } from "api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: "loading",
    user: null,
    responseData: null, // Added field for response data
    passwordResetLinkSent: false,
    confregEmailSent: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data asynchronously and update the state
    const loadUserData = async () => {
      const userData = await fetchUserData();
      setAuthState((prevState) => ({
        ...prevState,
        user: userData,
        isAuthenticated: !!userData, // Update isAuthenticated based on userData
      }));
    };

    loadUserData();
  }, [location.pathname, navigate]);

  const setAuthInfo = ({ user }) => {
    setAuthState({ ...authState, isAuthenticated: !!user, user });
  };

  const clearAuthInfo = () => {
    setAuthState({ ...authState, isAuthenticated: false, user: null });
  };

  const setUser = (user) => {
    setAuthState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        ...user,
      },
    }));
  };

  // New function to set response data
  const setResponseData = (data) => {
    setAuthState({ ...authState, responseData: data });
  };

  // New function to clear response data
  const clearResponseData = () => {
    setAuthState({ ...authState, responseData: null });
  };

  const setPasswordResetLinkSent = (passwordResetLinkSent) => {
    setAuthState({ ...authState, passwordResetLinkSent });
  };

  const clearPasswordResetLinkSent = () => {
    setAuthState({ ...authState, passwordResetLinkSent: false });
  };

  const setConfregEmailSent = (confregEmailSent) => {
    setAuthState({ ...authState, confregEmailSent });
  };

  const clearConfregEmailSent = () => {
    setAuthState({ ...authState, confregEmailSent: false });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUser,
        setAuthInfo,
        setAuthState,
        clearAuthInfo,
        setResponseData,
        clearResponseData,
        setPasswordResetLinkSent,
        clearPasswordResetLinkSent,
        setConfregEmailSent,
        clearConfregEmailSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
