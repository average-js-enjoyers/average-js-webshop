import React from "react";
import Logo from "components/common/Logo";

const NotFoundScreen = () => {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
