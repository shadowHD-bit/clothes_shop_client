import React from "react";
import "./QuestionPage.scss";
import {
  Accordion,
  Col,
  Container,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { fetchRules } from "../../http/rulesAPI";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";

export default function () {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetchRules().then((data) => {
      setQuestion(data.rows);
    });
  }, []);

  return (
    <>
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
            <p className="question_title">
              <span className="red">Дорогой </span> пользователь!
            </p>
            <p>
              На данной странице вы можете ознакомиться с частозадаваемыми вопросами. Советуем изучить данные вопросы, прежде чем обращаться к администрации веб-сервиса.
            </p>
          </Col>
        </Row>{" "}
        <Row>
          <p className="question_title">
            Частозадаваемые <span className="red">вопросы</span>
          </p>
        </Row>
        <Row>
          <Accordion defaultActiveKey="0">
            {question?.map((item) => (
              <Accordion.Item eventKey={item.id}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.information}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Row>
      </Container>
      <NavigationBlock />
    </>
  );
}
