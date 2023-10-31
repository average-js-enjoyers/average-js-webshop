import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => (
  <div className="Layout">
    <nav>
      <ul>
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

export default HomeScreen;
