import React from "react";
import { Route, Routes } from "react-router-dom";

// APP LEVEL COMPONENTS
import MainLayout from "components/layout/MainLayout";

// CONTEXTS
import GlobalContextProvider from "./context";

// SCREENS
import HomeScreen from "screens/HomeScreen";
import AuthScreen from "screens/auth/AuthScreens";
import OAuthCallbackScreen from "screens/auth/OAuthCallbackScreen";
import InternalAuthCallbackScreen from "screens/auth/InternalAuthCallbackScreen";
import ProfileDashboardScreen from "screens/profile/ProfileDashboardScreen";
import ProfileManageAccountScreen from "screens/profile/ProfileManageAccountScreen";
import PrivacyPolicyScreen from "screens/gdpr/PrivacyPolicyScreen";
import NotFoundScreen from "screens/error/NotFoundScreen";
import EmailTestScreen from "screens/EmailTestScreen";
import ProtectedRoute from "components/routes/ProtectedRoute";

// STYLES
import "assets/styles/css/index.css";

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        {/* Routes within MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileDashboardScreen />} />
            <Route
              path="/profile/manage"
              element={<ProfileManageAccountScreen />}
            />
          </Route>
          <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
        </Route>

        {/* Routes outside the MainLayout */}
        <Route path="/signup" element={<AuthScreen route="signup" />} />
        <Route
          path="/confirm-registration"
          element={<AuthScreen route="confirm-registration" />}
        />
        <Route
          path="/onboard/:token"
          element={<AuthScreen route="onboard" />}
        />
        <Route path="/signin" element={<AuthScreen route="signin" />} />
        <Route
          path="/admin-signin"
          element={<AuthScreen route="admin-signin" />}
        />
        <Route
          path="/forgot-password"
          element={<AuthScreen route="forgot-password" />}
        />
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
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
