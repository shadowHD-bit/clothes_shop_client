import { Card, Col, Container, Row } from "react-bootstrap";
import RegisterImage from "../../templates/Register/RegisterImage/RegisterImage";
import RegisterForm from "../../templates/Register/RegisterForm/RegisterForm";

import './RegisterPage.scss'

function Register() {
  return (
    <>
      <Container className="reg_container" fluid='md'>
        <Row>
          <Col xs={12}>
            <Card className="reg_card">
              <Row
                className="d-flex justify-center w-100"
                style={{ "--bs-gutter-x": 0 }}
              >
                <RegisterImage />
                <RegisterForm />
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
