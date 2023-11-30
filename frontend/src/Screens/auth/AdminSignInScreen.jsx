import { Link, useLocation } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import StatusMessage from "components/common/StatusMessage";
import Button from "components/common/Button";

import AdminSignInForm from "components/forms/AdminSignInForm";

import { PersonCheckFill } from "react-bootstrap-icons";

import { useAuth } from "hooks/useAuth";

import { useState, useEffect } from "react";

import QRCode from "qrcode.react";

export default function AdminSignInScreen() {
  const { signInWithProvider } = useAuth();
  const location = useLocation();

  const oauthError = location.state?.oauthError || null;

  const [qrData, setQrData] = useState(null);
  const [qrDataFetched, setQrDataFetched] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const fetchQRCodeData = async () => {
    try {
      const response = await fetch("/scrape");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.text(); // Assuming the endpoint returns plain text
      setQrData(data);
      setQrDataFetched(true);
    } catch (error) {
      console.error("Error fetching QR Code:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // TODO - Remove this test function and uncomment the one above
  /* const fetchQRCodeData = () => {
    // Simulating a network request with a timeout
    setTimeout(() => {
      // Dummy data to simulate the response
      const dummyQRData = "Simulated QR Code Data 🎉";
      setQrData(dummyQRData);
      setQrDataFetched(true);
    }, 1000); // Simulated network delay of 1000ms (1 second)
  }; */

  useEffect(() => {
    let interval;

    if (qrDataFetched) {
      setCountdown(30); // Reset countdown when QR code is fetched
      interval = setInterval(() => {
        setCountdown(
          (prevCountdown) => Math.round((prevCountdown - 0.1) * 10) / 10
        );
      }, 100);

      const timer = setTimeout(() => {
        clearInterval(interval); // Clear interval when QR code expires
        setQrData(null);
        setQrDataFetched(false);
        setCountdown(10); // Reset countdown
      }, 30000); // 10 seconds

      return () => {
        clearTimeout(timer);
        clearInterval(interval); // Cleanup on unmount
      };
    }
  }, [qrDataFetched]);

  return (
    <>
      {oauthError && <StatusMessage type="danger" message={oauthError} />}
      <Card>
        <CardHeader>
          <CardLogo className="card__logo--auth">
            <PersonCheckFill color="var(--secondary-90)" />
          </CardLogo>
          <CardTitle level="1" textAlign="center">
            Sign In Now
          </CardTitle>
        </CardHeader>
        <CardBody>
          {qrDataFetched ? (
            <div className="text-center">
              <QRCode value={qrData} />
              <p style={{ color: "var(--accent-70)" }}>{qrData}</p>
              <p className="mt-3">
                Scan the QR code above with your phone to sign in.
              </p>
              <p className="mt-3">
                <small style={{ color: "var(--grayscale-60)" }}>
                  <strong style={{ color: "var(--grayscale-60)" }}>
                    Note:
                  </strong>{" "}
                  This QR code will expire in{" "}
                  <strong style={{ color: "var(--accent-60)" }}>
                    {countdown}
                  </strong>{" "}
                  seconds.
                </small>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    setQrDataFetched(false);
                  }}
                  className="mt-3"
                  variant={"info btn--muted"}
                >
                  Go Back
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button
                onClick={fetchQRCodeData}
                className="mb-3"
                variant={"warning btn--muted"}
              >
                Fetch QR Code
              </Button>
              <AdminSignInForm />
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}
