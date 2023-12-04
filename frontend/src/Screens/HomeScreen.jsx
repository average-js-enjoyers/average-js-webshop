//src/screens/HomeScreen.jsx
import { Link } from "react-router-dom";

// import { useAuth } from "context/AuthContext";
import { useAuth } from "hooks";

import Button from "components/common/Button";

const HomeScreen = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <div className="home-screen">
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

        <Link to="/profile/manage">
          <Button variant="outline-info ">Manage Account</Button>
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
