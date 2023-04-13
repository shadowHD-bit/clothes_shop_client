import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import './MainInfoAbout.scss'

export default function MainInfoAbout() {
  return (
    <>
      <Container className="main_about" fluid>
        <Container>
          <Row>
            <Col
              xs={12}
              md={6}
              className="text-center d-flex column justify-content-center align-items-center"
            >
              <p className="text_logo">
                SHOP<span className="logo_dot">.</span>RU
              </p>
            </Col>
            <Col
              xs={12}
              md={6}
              className="text-center d-flex row justify-content-center align-items-center"
            >
              <p>
                Добро пожаловать в SHOP.RU - интернет-магазин, где вы можете
                найти все, что нужно для комфортной и стильной жизни. Наш
                магазин предлагает широкий ассортимент товаров.
              </p>
              <p>
                Мы работаем только с проверенными поставщиками, чтобы
                гарантировать высокое качество и надежность наших товаров. У нас
                вы найдете товары от известных брендов, а также уникальные
                предметы, которые помогут выделиться из толпы.
              </p>
              <p>
                Мы ценим наших клиентов и всегда готовы помочь вам с выбором
                товаров, ответить на ваши вопросы и предложить лучшие решения
                для вашей покупки. В SHOP.RU мы стараемся сделать покупки
                максимально приятными и удобными для вас!
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
