import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import "./DeliveryPage.scss";
import { MdAirplaneTicket, MdOutlineAssignment } from "react-icons/md";
import {
  AiFillCar,
  AiOutlineFieldTime,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { deliveryCondition, deliveryData, deliveryPayment } from "../../utils/deliveryInfo";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";

export default function DeliveryPage() {
  return (
    <>
      <Container fluid className="delivery_info">
        <Container>
          <Row>
            <p className="delivery_title">
              Информация о <span className="red">доставке</span>
            </p>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <MdAirplaneTicket size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">По всей России</p>
                </Row>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <AiOutlineFieldTime size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">7-15 дней</p>
                </Row>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <MdOutlineAssignment size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">14 дней на возврат</p>
                </Row>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <FaCity size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">Отправка из Томска</p>
                </Row>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <AiFillCar size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">Бесплатная доставка</p>
                </Row>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="delivery_card_popular">
                <Row>
                  <AiOutlineSafetyCertificate size={40} />
                </Row>
                <Row>
                  <p className="text-center m-0">Безопасность</p>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row>
            <p className="delivery_title">
              <span className="red">Условия</span> доставки
            </p>
          </Row>
          <Row>
            {deliveryCondition.map((condition) => (
              <p>{condition}</p>
            ))}
          </Row>
        </Container>

        <Container className="mt-2">
          <Row>
            <p className="delivery_title">
              <span className="red">Оплата</span> доставки
            </p>
          </Row>
          <Row>
            {deliveryPayment.map((payment) => (
              <p>{payment}</p>
            ))}
          </Row>
        </Container>

        <Container className="mt-2">
          <Row>
            <p className="delivery_title">
              <span className="red">Сроки</span> доставки
            </p>
          </Row>
          <Row>
            {deliveryData.map((date) => (
              <p>{date}</p>
            ))}
          </Row>
        </Container>

        <NavigationBlock />
      </Container>
    </>
  );
}
