import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EmailTestScreen() {
  const { emailName } = useParams();
  const emailUrl = `/emails/${emailName}.html`;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <iframe
        src={emailUrl}
        title="Email Test Screen"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflowY: "hidden",
        }}
      />
    </div>
  );
}
