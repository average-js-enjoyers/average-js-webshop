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

export default function AdminSignInScreen() {
  const { signInWithProvider } = useAuth();
  const location = useLocation();

  const oauthError = location.state?.oauthError || null;

  return (
    <>
      {oauthError && <StatusMessage type="danger" message={oauthError} />}
      <Card>
        <CardBody>
          <CardHeader>
            <CardLogo>
              <PersonCheckFill color="var(--secondary-90)" />
            </CardLogo>
            <CardTitle level="1" textAlign="center">
              Sign In Now
            </CardTitle>
          </CardHeader>
          <AdminSignInForm />
        </CardBody>
      </Card>
    </>
  );
}
