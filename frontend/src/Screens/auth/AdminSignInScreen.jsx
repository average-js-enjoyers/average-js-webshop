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
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let interval;

    if (qrDataFetched) {
      setCountdown(10); // Reset countdown when QR code is fetched
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
      }, 10000); // 10 seconds

      return () => {
        clearTimeout(timer);
        clearInterval(interval); // Cleanup on unmount
      };
    }
  }, [qrDataFetched]);

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/your-endpoint");
        const jsonData = await response.json();
        setQrData(jsonData.yourDataField);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); */

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
                onClick={() => {
                  setQrDataFetched(true);
                  /* setQrData("Average JS Enjoyers 🎉😎"); */
                  setQrData("ORDAS FASZ");
                }}
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
