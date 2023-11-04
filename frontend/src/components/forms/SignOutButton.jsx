//src/components/forms/SignOutButton.jsx
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthContext";

export default function SignOutButton() {
  const { signOut } = useAuth();

  return <button onClick={signOut}>Sign Out</button>;
}
