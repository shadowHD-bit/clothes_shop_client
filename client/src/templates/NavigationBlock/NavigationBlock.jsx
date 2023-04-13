import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import "./NavigationBlock.scss";
import { FaBuilding, FaLocationArrow, FaQuoteRight, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, DELIVERY_ROUTE, LOCATIONPLACES_ROUTE, QUESTION_ROUTE, RULES_ROUTE } from "../../utils/consts";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";

export default function NavigationBlock() {
  return (
    <>
      <Container className="navigation_block" fluid>
        <Container>
          <Row>
            <p className="navigation_block_title">
              <span className="red">Раздел </span> навигации
            </p>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Link to={QUESTION_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <FaQuoteRight size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Вопросы</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={RULES_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <IoMdDocument size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Правила</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={DELIVERY_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <FaTruck size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Доставка</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={DELIVERY_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <AiOutlineReload size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Возврат</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={LOCATIONPLACES_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <FaLocationArrow size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">Локации</p>
                  </Row>
                </Card>
              </Link>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Link to={ABOUT_ROUTE}>
                <Card className="navigation_card">
                  <Row className="mb-4">
                    <FaBuilding size={40} />
                  </Row>
                  <Row className="text-center">
                    <p className="p-0 m-0">О компании</p>
                  </Row>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
