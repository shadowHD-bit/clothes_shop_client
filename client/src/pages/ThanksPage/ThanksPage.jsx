import React, { useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { sendOrder } from "../../http/orderAPI";
import "./ThanksPage.scss";

export default function ThanksPage() {
  useEffect(() => {
    if (localStorage.getItem("user_details") !== null) {
      const data = JSON.parse(localStorage.getItem("user_details"));

      const formData = new FormData();
      formData.append("sale", data.sale == 1 ? 0 : (1 - data.sale).toFixed(2));
      formData.append("paymentDelivery", data.paymentDelivery);
      formData.append("totalPrice", data.totalPrice);
      formData.append("firstName", data.firstName);
      formData.append("secondName", data.secondName);
      formData.append("numberPhone", data.numberPhone);
      formData.append("country", "Россия");
      formData.append("city", data.city);
      formData.append("street", data.street);
      formData.append("numberHome", data.numberHome);
      formData.append("numberApartment", data.numberApartment);
      formData.append("zipCode", data.zipCode);
      sendOrder(formData).then(() => {
        // window.location.href = CHECKOUT_ROUTE;
      });
      localStorage.removeItem("user_details");
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Container className="thanks_container">
        <Card className="thanks_card">
          <Card.Body>
            <Row>
              <Col className="d-flex flex-column justify-content-center">
                <Card.Title>Спасибо за покупку!</Card.Title>
                <Card.Text>
                  Ваш заказ оформлен! Скоро он отобразиться в разделе "Заказы".
                  С уважением SHOP.RU
                </Card.Text>
                <Button
                  variant="outline-success"
                  onClick={() => (window.location.href = "/")}
                >
                  Вернуться на главную страницу
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                {" "}
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    "/img/productcard/video-calling.png"
                  }
                  width={250}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
