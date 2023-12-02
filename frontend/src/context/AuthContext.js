// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

import { fetchUserData } from "api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /*   const shippingAddresses = [
    {
      isActive: true,
      id: 1,
      name: "Cube Base HQ",
      street: "Csók István tér 420.",
      city: "2483 Gárdony, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "Cube Base HQ",
      street: "Csók István tér 420.",
      city: "2483 Gárdony, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "Cube Base HQ",
      street: "Csók István tér 420.",
      city: "2483 Gárdony, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "Cube Base HQ",
      street: "Csók István tér 420.",
      city: "2483 Gárdony, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "Cube Base HQ",
      street: "Csók István tér 420.",
      city: "2483 Gárdony, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
  ];

  const billingAddresses = [
    {
      isActive: true,
      id: 1,
      name: "L-TECH",
      company: "L-TECH Kft.",
      vatID: "11116422-2-07",
      street: "Széchenyi utca 105.",
      city: "8151 Szabadbattyán, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "L-TECH",
      company: "L-TECH Kft.",
      vatID: "11116422-2-07",
      street: "Széchenyi utca 105.",
      city: "8151 Szabadbattyán, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "L-TECH",
      company: "L-TECH Kft.",
      vatID: "11116422-2-07",
      street: "Széchenyi utca 105.",
      city: "8151 Szabadbattyán, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
    {
      isActive: false,
      id: 2,
      name: "L-TECH",
      company: "L-TECH Kft.",
      vatID: "11116422-2-07",
      street: "Széchenyi utca 105.",
      city: "8151 Szabadbattyán, HUNGARY",
      phoneNumber: "+36 30 420 69 69",
    },
  ]; */

  const [authState, setAuthState] = useState({
    isAuthenticated: "loading",
    user: null,
    responseData: null, // Added field for response data
    passwordResetLinkSent: false,
    confregEmailSent: false,
    /* shippingAddresses,
    billingAddresses, */
  });

  // Function to load user data using JWT token
  const loadAuthState = async () => {
    const token = sessionStorage.getItem("accessToken"); // Replace 'jwtToken' with your actual token key
    if (token) {
      // If token exists, fetch user data
      const userData = await fetchUserData(token);
      setAuthState({
        ...authState,
        isAuthenticated: !!userData,
        user: userData,
      });
    } else {
      setAuthState({ ...authState, isAuthenticated: false });
    }
  };

  useEffect(() => {
    loadAuthState();
  }, []); // Empty dependency array to run only on component mount

  // TODO - For some reason this always returns the user to the home screen (at least from profile)
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
