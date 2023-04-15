import React from "react";
import "./AdminImage.scss";
import {
  Accordion,
  Alert,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const AdminImage = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Container className="admin_container_image">
        <AdminTitle charter={'Раздел "Изображения"'}/>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для информации о основных
                  изображениях, которые используются на сайте...
                </Alert.Heading>
                <p>
                  Здесь ты можешь увидеть информацию о соотношении сторон
                  используемых картинок, а так же о их размерах...
                </p>
                <p>
                  ВНИМАНИЕ! Реальные размеры изображений могут отличаться,
                  однако, рекомендуем соблюдать указанные соотношения сторон,
                  чтобы избежать форматирования и непропорционального сжатия
                  изображений на кормточках...
                </p>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="" className="mt-2 mb-2">
              <Accordion.Header>
                Изображения для брендов и типов
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12}>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/1280x800/ef233c/000000&text=1280x800&font=kelson"
                        style={{ width: 1280, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/1024x768/ef233c/000000&text=1024x768&font=kelson"
                        style={{ width: 1024, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/480x320/ef233c/000000&text=480x320&font=kelson"
                        style={{ width: 480, height: "auto" }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion className="mb-2">
            <Accordion.Item eventKey="">
              <Accordion.Header>Изображения для слайдера</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12}>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/1280x800/ef233c/000000&text=1280x800&font=kelson"
                        style={{ width: 1280, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/1024x768/ef233c/000000&text=1024x768&font=kelson"
                        style={{ width: 1024, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/480x320/ef233c/000000&text=480x320&font=kelson"
                        style={{ width: 480, height: "auto" }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion className="mb-2">
            <Accordion.Item eventKey="">
              <Accordion.Header>Изображения для товаров</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12}>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/800x1280/ef233c/000000&text=800x1280&font=kelson"
                        style={{ width: 800, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/764x1024/ef233c/000000&text=764x1024&font=kelson"
                        style={{ width: 764, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/320x480/ef233c/000000&text=320x480&font=kelson"
                        style={{ width: 320, height: "auto" }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion className="mb-2">
            <Accordion.Item eventKey="">
              <Accordion.Header>Изображения для аватаров</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12}>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/1024x1024/ef233c/000000&text=1024x1024&font=kelson"
                        style={{ width: 1024, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/764x764/ef233c/000000&text=764x764&font=kelson"
                        style={{ width: 764, height: "auto" }}
                      />
                    </Row>
                    <Row className="mt-1">
                      <Image
                        src="https://imgholder.ru/480x480/ef233c/000000&text=480x480&font=kelson"
                        style={{ width: 480, height: "auto" }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};
export default AdminImage;
