//src/components/forms/SignOutButton.jsx
import { useNavigate } from "react-router-dom";

export default function GoogleSignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the application session
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("oauthState");
    sessionStorage.removeItem("codeVerifier");

    // Redirect to the sign-in page or home page
    navigate("/", { state: { signOutSuccess: true } });

    // Optionally, sign out from Google too. Uncomment the following line if needed.
    // window.location.href = 'https://accounts.google.com/Logout';
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
