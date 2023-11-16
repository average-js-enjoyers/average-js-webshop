//src/screens/HomeScreen.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

// import { useAuth } from "context/AuthContext";
import { useAuth } from "hooks/useAuth";

import Button from "components/common/Button";
import StatusMessage from "components/common/StatusMessage";

const HomeScreen = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  // Check for the navigation state
  const location = useLocation();
  const { signInSuccess, signOutSuccess } = location.state || {};

  return (
    <div className="Layout">
      {signInSuccess && (
        <StatusMessage
          type="success"
          message="Welcome back! You have signed in successfully."
        />
      )}

      {signOutSuccess && (
        <StatusMessage
          type="info"
          message="You have signed out successfully. See you soon!"
        />
      )}



      <nav style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/signup">
          <Button variant="secondary btn--compact">Sign Up</Button>
        </Link>
        <Link to="/signin">
          <Button variant="outline-primary btn--compact">Sign In</Button>
        </Link>
        <Link to="/admin-signin">
          <Button variant="outline-primary btn--compact">Admin Sign In</Button>
        </Link>
        <Link to="/onboard">
          <Button variant="outline-warning btn--compact">Onboarding</Button>
        </Link>
        <Link to="/profile">
          <Button variant="light btn--compact">View Profile</Button>
        </Link>

        <Link to="/profile/edit">
          <Button variant="info btn--compact">Edit Profile</Button>
        </Link>
        <Button variant="outline-dark btn--compact" onClick={signOut}>
          Sign Out
        </Button>
      </nav>
    </div>
  );
};

export default HomeScreen;
