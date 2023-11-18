//src/screens/HomeScreen.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

// import { useAuth } from "context/AuthContext";
import { useAuth } from "hooks";
import { fetchUserData } from "api";

import Button from "components/common/Button";
import StatusMessage from "components/common/StatusMessage";

const HomeScreen = () => {
  const { signOut, isAuthenticated } = useAuth();

  // Check for the navigation state
  const location = useLocation();
  const { signInSuccess } = location.state || {};

  const signOutSuccess = sessionStorage.getItem("signOutSuccess");
  const onboardSuccess = sessionStorage.getItem("onboardSuccess");
  const pwdResetSuccess = sessionStorage.getItem("pwdResetSuccess");

  return (
    <div className="home-screen">
      {signInSuccess && (
        <StatusMessage
          type="success"
          message="Welcome back! You have signed in successfully."
        />
      )}

      {signOutSuccess && (
        <StatusMessage
          type="success"
          message="You have signed out successfully. See you soon!"
          cleanupFunction={() => sessionStorage.removeItem("signOutSuccess")}
        />
      )}

      {onboardSuccess && (
        <StatusMessage
          type="success"
          message="You have successfully onboarded. Welcome to the Shop!"
          cleanupFunction={() => sessionStorage.removeItem("onboardSuccess")}
        />
      )}

      {pwdResetSuccess && (
        <StatusMessage
          type="success"
          message="You have changed your password and are now signed in. Welcome to the Shop!"
          cleanupFunction={() => sessionStorage.removeItem("pwdResetSuccess")}
        />
      )}

      <h1 className="text-center mb-3">Auth & User Development Kit</h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link to="/signup">
          <Button variant="outline-success">Sign Up</Button>
        </Link>
        <Link to="/signin">
          <Button variant="success">Sign In</Button>
        </Link>
        <Link to="/admin-signin">
          <Button variant="success">Admin Sign In</Button>
        </Link>
        <Link to="/onboard/token">
          <Button variant="primary ">Onboarding</Button>
        </Link>
        <Link to="/profile">
          <Button variant="light ">View Profile</Button>
        </Link>

        <Link to="/profile/edit">
          <Button variant="outline-info ">Edit Profile</Button>
        </Link>

        {isAuthenticated && (
          <Button variant="outline-danger " onClick={signOut}>
            Sign Out
          </Button>
        )}
      </nav>
      <div
        className="mt-6"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <h1 className="mt-6">Button Template Test</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="outline-primary">Outline Primary Button</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline-secondary">Outline Secondary Button</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="success">Success Button</Button>
          <Button variant="outline-success">Outline Success Button</Button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="light">Light Button</Button>
          <Button variant="outline-light">Outline Light Button</Button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="dark">Dark Button</Button>
          <Button variant="outline-dark">Outline Dark Button</Button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="warning">Warning Button</Button>
          <Button variant="outline-warning">Outline Warning Button</Button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="danger">Danger Button</Button>
          <Button variant="outline-danger">Outline Danger Button</Button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <Button variant="info">Info Button</Button>
          <Button variant="outline-info">Outline Info Button</Button>
        </div>

        <Button variant="link">Link Button</Button>
      </div>
    </div>
  );
};

export default HomeScreen;
