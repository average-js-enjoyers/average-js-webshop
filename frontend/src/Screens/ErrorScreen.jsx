import React from "react";
import { useRouteError } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

const ErrorScreen = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage = error?.message || "An unexpected error has occurred.";
  const errorStatusText = error?.statusText || "Error";

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Alert variant="danger">
            <Alert.Heading>{errorStatusText}</Alert.Heading>
            <p>{errorMessage}</p>
            <hr />
            <p className="mb-0">
              <small>
                Error details: <i>{errorMessage}</i>
              </small>
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorScreen;
