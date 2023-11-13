import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { Card, CardBody, CardTitle, CardFooter } from "components/common/Card";
import StatusMessage from "components/common/StatusMessage";

import AuthContext from "context/AuthContext";

export default function ConfirmRegistrationScreen() {
  const { confregEmailSent, clearConfregEmailSent } = useContext(AuthContext);

  const location = useLocation();
  const signUpSuccess = location.state?.signUpSuccess || false;

  return (
    <>
      {confregEmailSent === true && confregEmailSent !== "COULD_NOT_SEND" && (
        <StatusMessage
          type="success"
          message="We've just sent you the confirmation email!"
          cleanupFunction={() => clearConfregEmailSent()}
        />
      )}
      {confregEmailSent === "COULD_NOT_SEND" && (
        <StatusMessage
          type="danger"
          message="Error sending confirmation email. Please request a resend a bit later."
          cleanupFunction={() => clearConfregEmailSent()}
        />
      )}

      <Card>
        <CardBody>
          <CardTitle level="1" textAlign="center">
            <span className="emoji-logo emoji-logo--display">📨</span> <br />
            Confirm Your Registration
          </CardTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "3rem",
              marginTop: "3rem",
            }}
          >
            {!signUpSuccess && (
              <p className="text-center lead">
                We could not send you a confirmation email. <br /> Please try
                again later.
              </p>
            )}
            {signUpSuccess === true && (
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
            <Link to="/resend-confirmation">Resend my confirmation email!</Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
