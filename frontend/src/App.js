//src/App.js

import { useState, useEffect } from "react";
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

// COMPONENTS
import StatusMessage from "components/common/StatusMessage";

// HOOKS
import { useAuth } from "hooks/useAuth";

// STYLES
import "assets/styles/css/index.css";

// RouteWrapper component
const RouteWrapper = ({ component: Component, ...props }) => {
  const { responseData, clearResponseData } = useAuth();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (responseData !== null) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [responseData]);

  return (
    <>
      {showMessage && (
        <StatusMessage
          type={responseData?.status === "error" ? "danger" : "success"}
          message={responseData?.message}
          cleanupFunction={() => clearResponseData()}
        />
      )}
      <Component {...props} />
    </>
  );
};

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RouteWrapper component={HomeScreen} />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<RouteWrapper component={ProfileDashboardScreen} />}
            />
            <Route
              path="/profile/manage"
              element={<RouteWrapper component={ProfileManageAccountScreen} />}
            />
          </Route>
          <Route
            path="/privacy-policy"
            element={<RouteWrapper component={PrivacyPolicyScreen} />}
          />
        </Route>

        {/* Routes outside the MainLayout */}
        <Route
          path="/signup"
          element={<RouteWrapper component={AuthScreen} route="signup" />}
        />
        <Route
          path="/confirm-registration"
          element={
            <RouteWrapper component={AuthScreen} route="confirm-registration" />
          }
        />
        <Route
          path="/onboard/:token"
          element={<RouteWrapper component={AuthScreen} route="onboard" />}
        />
        <Route
          path="/signin"
          element={<RouteWrapper component={AuthScreen} route="signin" />}
        />
        <Route
          path="/admin-signin"
          element={<RouteWrapper component={AuthScreen} route="admin-signin" />}
        />
        <Route
          path="/forgot-password"
          element={
            <RouteWrapper component={AuthScreen} route="forgot-password" />
          }
        />
        <Route
          path="/auth/internal"
          element={<RouteWrapper component={InternalAuthCallbackScreen} />}
        />
        <Route
          path="/oauth/google"
          element={
            <RouteWrapper component={OAuthCallbackScreen} provider="google" />
          }
        />
        <Route
          path="/oauth/facebook"
          element={
            <RouteWrapper component={OAuthCallbackScreen} provider="facebook" />
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RouteWrapper component={AuthScreen} route="reset-password" />
          }
        />
        <Route path="*" element={<RouteWrapper component={NotFoundScreen} />} />

        {/* For testing emails: */}
        <Route
          path="/emails/:emailName"
          element={<RouteWrapper component={EmailTestScreen} />}
        />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
