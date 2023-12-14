import { Google, Facebook } from "react-bootstrap-icons";
import Button from "components/common/Button";

import { useAuth } from "hooks/useAuth";

function OAuthButtons() {
  const { signInWithProvider } = useAuth();

  return (
    <div className="oauth-button-wrapper mt-3">
      <Button
        variant="danger btn--compact"
        onClick={() => signInWithProvider("google")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          fontWeight: 500,
          fontSize: "1.6rem",
        }}
      >
        <Google
          style={{
            height: "3rem",
            width: "3rem",
            fill: "var(--grayscale-0)",
          }}
        />
        Google
      </Button>

      <Button
        variant="info btn--compact"
        onClick={() => signInWithProvider("facebook")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          fontWeight: 500,
          fontSize: "1.6rem",
        }}
      >
        <Facebook
          style={{
            height: "3rem",
            width: "3rem",
            fill: "var(--grayscale-0)",
          }}
        />
        Facebook
      </Button>
    </div>
  );
}

export default OAuthButtons;
