// src/contexts/AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    responseData: null, // Added field for response data
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

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthInfo,
        clearAuthInfo,
        setResponseData, // Adding the new function to context
        clearResponseData, // Adding the new function to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
