import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import { AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import "./AdminStatistic.scss";
import RatingChart from "../../../../components/Charts/RatingChart";
import ProductBuyCount from "../../../../components/Charts/ProductBuyCount";
import UserRegistration from "../../../../components/Charts/UserRegistration";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
const AdminStatistic = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [stateAccordion, setStateAccordion] = useState(false);
  const [stateAccordionTwo, setStateAccordionTwo] = useState(false);
  const [stateAccordionThree, setStateAccordionThree] = useState(false);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Статистика"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для просмотра визуалищированной
                  статистики...
                </Alert.Heading>
                <p>Здесь ты можешь:</p>
                <ul>
                  <li>Увидеть график продаж товара.</li>
                  <li>График регистраций в сервисе.</li>
                  <li>Среднюю оценку по товарам.</li>
                  <li>График статистики вопросов.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordion(true)}
            >
              <AccordionHeader>График заказов</AccordionHeader>
              <AccordionBody>
                <ProductBuyCount stateAccordion={stateAccordion} />
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordionTwo(true)}
            >
              <AccordionHeader>
                График средней оценки по товарам
              </AccordionHeader>
              <AccordionBody>
                <Row className="donut_chart_container">
                  <RatingChart stateAccordion={stateAccordionTwo} />
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordionThree(true)}
            >
              <AccordionHeader>
                График регистраций пользователей
              </AccordionHeader>
              <AccordionBody>
                <Row className="donut_chart_container">
                  <UserRegistration stateAccordion={stateAccordionThree} />
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};
export default AdminStatistic;
