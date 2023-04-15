import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  ABOUT_ROUTE,
  DELIVERY_ROUTE,
  LOCATIONPLACES_ROUTE,
  PRODUCT_ROUTE,
  QUESTION_ROUTE,
  REFUND_ROUTE,
  RULES_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import { Link } from "react-router-dom";

import "./Footer.scss";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Container fluid className="p-0 m-0">
          <Container fluid="md">
            <Row className="p-0 m-3">
              <Col className="p-0 m-0" xs={12} sm={6} md={3}>
                <Row className="text-start">
                  <Link to={SHOP_ROUTE}>
                    <p className="text_logo text-start">
                      SHOP<span className="dot">.</span>RU
                    </p>
                  </Link>
                </Row>
                <Row className="p-0 m-0 mb-3">
                  <Col className="p-0 m-0">
                    <p className="text_us">
                      Добро пожаловать в SHOP.RU - интернет-магазин, где вы
                      можете найти все, что нужно для комфортной и стильной
                      жизни.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col className="p-0 m-0 mb-3 text-center" xs={12} sm={6} md={3}>
                <Row>
                  <span className="red-footer">Основное</span>
                </Row>
                <Row>
                  <Link className="footer_link" to={SHOP_ROUTE}>
                    Главная
                  </Link>
                  <Link className="footer_link" to={PRODUCT_ROUTE}>
                    Товары
                  </Link>
                  <Link className="footer_link" to={ABOUT_ROUTE}>
                    О нас
                  </Link>
                  <Link className="footer_link" to={LOCATIONPLACES_ROUTE}>
                    Основные адреса
                  </Link>
                </Row>
              </Col>
              <Col className="p-0 m-0 mb-3 text-center" xs={12} sm={6} md={3}>
                <Row>
                  <span className="red-footer">Дополнительно</span>
                </Row>
                <Row>
                  <Link className="footer_link" to={RULES_ROUTE}>
                    Правила
                  </Link>
                  <Link className="footer_link" to={QUESTION_ROUTE}>
                    Вопросы
                  </Link>
                  <Link className="footer_link" to={REFUND_ROUTE}>
                    Возврат
                  </Link>
                  <Link className="footer_link" to={DELIVERY_ROUTE}>
                    Доставка
                  </Link>
                </Row>
              </Col>
              <Col className="p-0 m-0 mb-3 text-center" xs={12} sm={6} md={3}>
                <Row>
                  <span className="red-footer">Социальные сети</span>
                </Row>
                <Row>
                  <Row className="p-0 m-0">
                    <Link className="footer_link" to={'https://www.google.ru/'}>
                      Youtube
                    </Link>
                    <Link className="footer_link" to={'https://www.google.ru/'}>
                      Вконтакте
                    </Link>
                    <Link className="footer_link" to={'https://www.google.ru/'}>
                      Instagram
                    </Link>
                    <Link className="footer_link" to={'https://www.google.ru/'}>
                      Facebook
                    </Link>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid className="p-0 m-0">
          <Row className="copyright">
            <Col className="p-0 m-0">
              <p className="copyright_text">
                Copyright © 2022. All rights recerved | This app is made by
                Alexandr Krivikov
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
