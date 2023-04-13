import React from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import AnimatedNumber from "animated-number-react";

import "./CounterAbout.scss";

export default function CounterAbout() {
  return (
    <>
      <Container className="count_data" id="count_data" fluid>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <IoIosPeople className="icon_count" size={"60px"} />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <AnimatedNumber
                className="countNumberA"
                value={1444}
                formatValue={(v) => v.toFixed(0)}
                duration={7000}
              />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <p className="countNumber">Довольных клиента</p>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <FaAward className="icon_count" size={"60px"} />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <AnimatedNumber
                className="countNumberA"
                value={5}
                formatValue={(v) => v.toFixed(0)}
                duration={3000}
              />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <p className="countNumber">Наград</p>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <AiOutlineLike className="icon_count" size={"60px"} />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <AnimatedNumber
                className="countNumberA"
                value={11}
                formatValue={(v) => v.toFixed(0)}
                duration={2000}
              />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <p className="countNumber">Выполненных проекта</p>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <GiCoffeeCup className="icon_count" size={"60px"} />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <AnimatedNumber
                className="countNumberA"
                value={368}
                formatValue={(v) => v.toFixed(0)}
                duration={4500}
              />
            </Row>
            <Row className="d-flex row justify-content-center align-items-center text-center">
              <p className="countNumber">Кружек кофе</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
