// InternalAuthCallbackScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/common/Logo";
import { useAuth } from "hooks";

function InternalAuthCallbackScreen() {
  const navigate = useNavigate();
  const { setResponseData } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResponseData({
        status: "success",
        message: "You have signed in successfully. Welcome!",
      });
      navigate("/");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate, setResponseData]);

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
