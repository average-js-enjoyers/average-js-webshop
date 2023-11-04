//src/components/forms/GoogleSignInButton.jsx
import { useAuth } from "context/AuthContext";

function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default GoogleSignInButton;
