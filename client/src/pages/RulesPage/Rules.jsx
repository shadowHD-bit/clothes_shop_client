import React from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { rulesService } from "../../utils/rules";
import { oferta } from "../../utils/oferta";

import "./Rules.scss";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="rules">
      <div className="main_info">
        <Container fluid="md">
          <Row className="mb-5">
            <Col
              xs={12}
              md={4}
              className="d-lg-flex d-none flex-row justify-content-end"
            >
              <img
                width={200}
                src={process.env.PUBLIC_URL + "/img/stickers/coffee-time.png"}
                alt="coffee-time"
              />
            </Col>
            <Col
              xs={12}
              md={12}
              lg={5}
              className="d-flex flex-column justify-content-start align-items-center"
            >
              <p className="rules_title">
                <span className="red">Дорогой </span> пользователь!
              </p>
              <p>
                Ознакомься с политикой конфиденциальности и официальной офертой
                сервиса для того, чтобы ознакомиться с правами и обязанностями
                при регистрации в веб-сервиса SHOP.RU
              </p>
            </Col>
          </Row>
          <Row>
            <p className="rules_title">
              Политика <span className="red">конфиденциальности</span>
            </p>
          </Row>
          <Row className="mb-5">
            <Accordion defaultActiveKey="1">
              {rulesService.map((rule) => (
                <Accordion.Item eventKey={rule.id}>
                  <Accordion.Header>{rule.rulesName}</Accordion.Header>
                  <Accordion.Body>
                    {rule.rules.map((item, idx) => (
                      <p>
                        {idx + 1}. {item}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Row>

          <Row>
            <p className="rules_title">
              Официальная <span className="red">оферта</span>
            </p>
          </Row>
          <Row className="mb-5">
            <Accordion defaultActiveKey="1">
              {oferta.map((offer) => (
                <Accordion.Item eventKey={offer.id}>
                  <Accordion.Header>{offer.title}</Accordion.Header>
                  <Accordion.Body>
                    {offer.info.map((item, idx) => (
                      <p>{item}</p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            <Col className="mt-2">
              <Link to="/files/Offer_SHOP_RU.pdf" target="_blank" download>
                <Button variant="outline-danger">
                  Скачать в формате .PDF
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
