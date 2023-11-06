//src/components/forms/FacebookSignInButton.jsx
import { useAuth } from "context/AuthContext";

function FacebookSignInButton() {
  const { signInWithFacebook } = useAuth();
  return <button onClick={signInWithFacebook}>Sign in with Facebook</button>;
}

export default FacebookSignInButton;
