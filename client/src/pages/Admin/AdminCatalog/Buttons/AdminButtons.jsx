import React from "react";
import "./AdminButtons.scss";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import {
  BsAlarm,
  BsAlarmFill,
  BsApp,
  BsBattery,
  BsCalculator,
  BsCart,
  BsMenuAppFill,
  BsSubtract,
} from "react-icons/bs";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const AdminButtons = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Container className="admin_container_btn">
        <AdminTitle charter={'Раздел "Кнопки"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для информации о основных кнопках,
                  которые используются на сайте...
                </Alert.Heading>
                <p>Здесь ты можешь увидеть следующую информацию:</p>
                <ul>
                  <li>Палитра цветов кнопок;</li>
                  <li>Типы кнопок.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="card_btn">
              <Card.Body>
                <Card.Title>Основные кнопки</Card.Title>
                <Row className="mb-3">
                  <Col>
                    <Button className="btn-special bg-white-red text-white">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-red text-white">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-black text-white">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-white text-black">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-pink-red text-black">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-pink text-black">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-green text-black">
                      Купить
                    </Button>{" "}
                    <Button className="btn-special bg-white-green text-black">
                      Купить
                    </Button>{" "}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Button className="btn-special bg-white-red text-white">
                      <BsAlarm />
                    </Button>{" "}
                    <Button className="btn-special bg-red text-white">
                      <BsAlarmFill />
                    </Button>{" "}
                    <Button className="btn-special bg-black text-white">
                      <BsApp />
                    </Button>{" "}
                    <Button className="btn-special bg-white text-black">
                      <BsCalculator />
                    </Button>{" "}
                    <Button className="btn-special bg-pink-red text-black">
                      <BsCart />
                    </Button>{" "}
                    <Button className="btn-special bg-pink text-black">
                      <BsSubtract />
                    </Button>{" "}
                    <Button className="btn-special bg-green text-black">
                      <BsMenuAppFill />
                    </Button>{" "}
                    <Button className="btn-special bg-white-green text-black">
                      <BsBattery />
                    </Button>{" "}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card_btn">
              <Card.Body>
                <Card.Title>Кнопки Bootstrap</Card.Title>
                <Row className="mb-3">
                  <Col>
                    <Button variant="primary">Primary</Button>{" "}
                    <Button variant="secondary">Secondary</Button>{" "}
                    <Button variant="success">Success</Button>{" "}
                    <Button variant="warning">Warning</Button>{" "}
                    <Button variant="danger">Danger</Button>{" "}
                    <Button variant="info">Info</Button>{" "}
                    <Button variant="light">Light</Button>{" "}
                    <Button variant="dark">Dark</Button>{" "}
                    <Button variant="link">Link</Button>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Button variant="outline-primary">Primary</Button>{" "}
                    <Button variant="outline-secondary">Secondary</Button>{" "}
                    <Button variant="outline-success">Success</Button>{" "}
                    <Button variant="outline-warning">Warning</Button>{" "}
                    <Button variant="outline-danger">Danger</Button>{" "}
                    <Button variant="outline-info">Info</Button>{" "}
                    <Button variant="outline-light">Light</Button>{" "}
                    <Button variant="outline-dark">Dark</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminButtons;
