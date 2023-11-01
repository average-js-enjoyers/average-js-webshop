import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorScreen = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage = error?.message || "An unexpected error has occurred.";
  const errorStatusText = error?.statusText || "Error";

  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%" }}>
          <div
            style={{
              padding: "1rem",
              border: "1px solid red",
              borderRadius: "0.25rem",
              backgroundColor: "#f8d7da",
              color: "#721c24",
            }}
          >
            <h4 style={{ marginTop: "0", color: "#721c24" }}>
              {errorStatusText}
            </h4>
            <p>{errorMessage}</p>
            <hr />
            <p style={{ marginBottom: "0" }}>
              <small>
                Error details: <i>{errorMessage}</i>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
