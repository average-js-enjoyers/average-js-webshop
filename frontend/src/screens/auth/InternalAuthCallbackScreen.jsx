// InternalAuthCallbackScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/common/Logo";

function InternalAuthCallbackScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/", { state: { signInSuccess: true } });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="auth-callback-loader">
      <Logo logoSize="small" />
      <div className="loader"></div>
      <p>
        Signing you in. <br /> Just a sec...
      </p>
    </div>
  );
}

export default InternalAuthCallbackScreen;
