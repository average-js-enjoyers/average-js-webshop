import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import SignOutButton from "components/forms/SignOutButton";

const HomeScreen = () => {
  const location = useLocation();
  const signOutSuccess = location.state?.signOutSuccess;
  const signInSuccess = location.state?.signInSuccess;
  return (
    <div className="Layout">
      {signInSuccess && (
        <div
          style={{
            color: "#155724",
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
            padding: "0.75rem 1.25rem",
            marginBottom: "1rem",
            border: "1px solid transparent",
            borderRadius: "0.25rem",
            fontSize: "2rem",
            lineHeight: 1.5,
          }}
        >
          Welcome back! You have signed in successfully.
        </div>
      )}

      {signOutSuccess && (
        <div
          style={{
            color: "#0c5460",
            backgroundColor: "#d1ecf1",
            borderColor: "#bee5eb",
            padding: "0.75rem 1.25rem",
            marginBottom: "1rem",
            border: "1px solid transparent",
            borderRadius: "0.25rem",
            fontSize: "2rem",
            lineHeight: 1.5,
          }}
        >
          Successfully signed out!
        </div>
      )}

      <nav>
        <ul>
          <li>
            <SignOutButton />
          </li>
          <li>
            <Link to="/ui-template">
              <button
                type="button"
                style={{
                  border: "1px solid black",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Go To UI Templates
              </button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button type="button" style={{ padding: "5px 10px" }}>
                Sign Up!
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile/edit">
              <button type="button" style={{ padding: "5px 10px" }}>
                Userdata!
              </button>
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <button type="button" style={{ padding: "5px 10px" }}>
                Sign in!
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeScreen;
