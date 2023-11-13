// src/contexts/AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    responseData: null, // Added field for response data
    passwordResetLinkSent: false,
    confregEmailSent: false,
  });

  const setAuthInfo = ({ user }) => {
    setAuthState({ ...authState, isAuthenticated: !!user, user });
  };

  const clearAuthInfo = () => {
    setAuthState({ ...authState, isAuthenticated: false, user: null });
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
        setAuthInfo,
        clearAuthInfo,
        setResponseData, // Adding the new function to context
        clearResponseData, // Adding the new function to context
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
