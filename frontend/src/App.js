import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Trigger a re-render when the location changes (route change)
    setKey(key + 1);
  }, [location]);

  return (
    <>
      <div key={key} id="screenFadeIn"></div>
      <Outlet />
    </>
  );
}

export default App;
