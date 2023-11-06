import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// APP LEVEL COMPONENTS

import App from "App";
import MainLayout from "components/layout/MainLayout";

// CONTEXTS

import GlobalContextProvider from "context/GlobalContext";

// SCREENS

import HomeScreen from "screens/HomeScreen";
import ErrorScreen from "screens/ErrorScreen";
import SignUpScreen from "screens/auth/QuickSignUpScreen";
import UITemplateExamplesScreen from "screens/UITemplateExamplesScreen";
import ViewProfileScreen from "screens/profile/ViewProfileScreen";
import EditProfileScreen from "screens/profile/EditProfileScreen";
import SignInScreen from "screens/auth/SignInScreen";
import NotFoundScreen from "screens/NotFoundScreen";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen";
import OAuthCallbackScreen from "screens/auth/OAuthCallbackScreen";
// import UITemplateExamplesScreen from "screens/UITemplateExamplesScreen";

// STYLES

import "assets/styles/css/index.css";

// Recommended (new) router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      }
    >
      <Route element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/profile/edit" element={<EditProfileScreen />} />
        <Route path="/profile" element={<ViewProfileScreen />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
      </Route>

      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/onboard" element={"Fasz"} />

      <Route
        path="/oauth/google"
        element={<OAuthCallbackScreen provider="google" />}
      />
      <Route
        path="/oauth/facebook"
        element={<OAuthCallbackScreen provider="facebook" />}
      />

      <Route path="*" element={<NotFoundScreen />} />

      {/* TODO For Development: 
      <Route path="/ui-template" element={<UITemplateExamplesScreen />} /> */}
    </Route>
  ),
  {
    // Provide an error element for the entire application
    errorElement: <ErrorScreen />,
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
