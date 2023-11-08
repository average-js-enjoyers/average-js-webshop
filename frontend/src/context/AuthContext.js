// src/contexts/AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const setAuthInfo = ({ user }) => {
    setAuthState({ isAuthenticated: !!user, user });
  };

  const clearAuthInfo = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthInfo,
        clearAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
