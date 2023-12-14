import {
  Card,
  CardHeader,
  CardLogo,
  CardBody,
  CardTitle,
  CardFooter,
} from "components/common/Card";
import { EnvelopePaperFill } from "react-bootstrap-icons";
import Button from "components/common/Button";

import { useAuth } from "hooks";

export default function ConfirmRegistrationScreen() {
  const { sendConfRegEmail, confregEmailSent } = useAuth();

  return (
    <>
      <Card>
        <CardHeader>
          <CardLogo className="card__logo--auth">
            <EnvelopePaperFill color="var(--secondary-90)" />
          </CardLogo>
          <CardTitle level="1" textAlign="center">
            Confirm Registration
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "3rem",
              marginTop: "3rem",
            }}
          >
            {confregEmailSent === "COULD_NOT_SEND" && (
              <p className="text-center lead">
                We could not send you a confirmation email. <br /> Please try
                again later.
              </p>
            )}
            {confregEmailSent === true && (
              <>
                <p
                  className="text-center"
                  style={{ fontWeight: "500", fontSize: "1.6rem" }}
                >
                  We’ve sent you an email. <br />
                  You can finalise your registration by clicking{" "}
                  <br className="d-none-sm" />
                  the link in the email.
                </p>
                <p className=" text-center">
                  Once you’ve clicked the link, you can sign in.
                </p>
              </>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <p
            className="text-center"
            style={{ fontWeight: "300", fontSize: "1.6rem" }}
          >
            Didn't get the email?
          </p>
          <p className="mt-1 text-center">
            <Button
              variant="link btn--compact"
              onClick={() =>
                sendConfRegEmail(sessionStorage.getItem("signUpEmail"))
              }
            >
              Resend my confirmation email!
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
