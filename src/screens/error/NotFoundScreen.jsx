import React from "react";
import Logo from "components/common/Logo";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
          <h1 style={{ marginTop: "1rem" }}>404 - Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <button className="btn btn-link" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
