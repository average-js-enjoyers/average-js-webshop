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

import GlobalContextProvider from "context";

// SCREENS

import HomeScreen from "screens/HomeScreen";

import AuthScreen from "screens/auth/AuthScreens";
import OAuthCallbackScreen from "screens/auth/OAuthCallbackScreen";
import InternalAuthCallbackScreen from "screens/auth/InternalAuthCallbackScreen";

import ViewProfileScreen from "screens/profile/ViewProfileScreen";
import EditProfileScreen from "screens/profile/EditProfileScreen";

import PrivacyPolicyScreen from "screens/gdpr/PrivacyPolicyScreen";

import NotFoundScreen from "screens/error/NotFoundScreen";
import ErrorScreen from "screens/error/ErrorScreen";

import EmailTestScreen from "screens/EmailTestScreen";

import ProtectedRoute from "components/routes/ProtectedRoute";

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
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/edit" element={<EditProfileScreen />} />
          <Route path="/profile" element={<ViewProfileScreen />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
      </Route>

      <Route path="/signup" element={<AuthScreen route="signup" />} />
      <Route
        path="/confirm-registration"
        element={<AuthScreen route="confirm-registration" />}
      />
      <Route path="/onboard/:token" element={<AuthScreen route="onboard" />} />
      <Route path="/signin" element={<AuthScreen route="signin" />} />

      <Route path="/auth/internal" element={<InternalAuthCallbackScreen />} />
      <Route
        path="/oauth/google"
        element={<OAuthCallbackScreen provider="google" />}
      />
      <Route
        path="/oauth/facebook"
        element={<OAuthCallbackScreen provider="facebook" />}
      />
      <Route
        path="/forgot-password"
        element={<AuthScreen route="forgot-password" />}
      />
      <Route
        path="/reset-password/:token"
        element={<AuthScreen route="reset-password" />}
      />

      <Route path="*" element={<NotFoundScreen />} />

      {/* For testing emails: */}
      <Route path="/emails/:emailName" element={<EmailTestScreen />} />
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
