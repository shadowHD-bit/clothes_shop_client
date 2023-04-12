import { Card, Col, Container, Row } from "react-bootstrap";

import AuthForm from "../../templates/Auth/AuthForm/AuthForm";
import AuthImage from "../../templates/Auth/AuthImage/AuthImage";
import "./Auth.scss";

const Auth = () => {
  return (
    <>
      <Container className="auth_container" fluid='md'>
        <Row>
          <Col xs={12}>
            <Card className="auth_card">
              <Row
                className="d-flex justify-center w-100"
                style={{ "--bs-gutter-x": 0 }}
              >
                <AuthForm />
                <AuthImage />
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
