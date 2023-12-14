// useCustomReloadHandler.js

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useCustomReloadHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("reloadRoute", location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);

  useEffect(() => {
    const reloadRoute = sessionStorage.getItem("reloadRoute");
    if (reloadRoute && window.location.pathname !== reloadRoute) {
      navigate(reloadRoute);
    }
  }, [navigate]);
};
