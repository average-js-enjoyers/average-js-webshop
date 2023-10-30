import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "components/common/Logo";

const NotFoundScreen = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Logo />
          <h1 className="mt-3">404 - Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundScreen;
