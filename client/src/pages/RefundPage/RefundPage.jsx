import React from "react";

import "./RefundPage.scss";
import { Container, Row } from "react-bootstrap";
import { refundInfo } from "../../utils/refundInfo";
import { Link } from "react-router-dom";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";

export default function RefundPage() {
  return (
    <>
      <Container fluid className="refund_container">
        <Container>
          <Row>
            <p className="refund_title">
              <span className="red">Раздел </span> возврата товара
            </p>
          </Row>
          <Row>
            {refundInfo.map((item) => (
              <p>{item}</p>
            ))}
          </Row>
        </Container>
        <Container>
          <Row className="mt-3">
            <p className="refund_title">
              <span className="red">Инструкция </span> возврата товара
            </p>
          </Row>
          <Row>
            <p>
              <b>
                <span className="red">Для возврата товара необходимо:</span>
              </b>
            </p>
            <p>
              1. Аккуратно упаковать товар в полной комплектации (товары,
              поставляемые в комплекте необходимо возвращать также в комплекте).
            </p>
            <p>
              2.{" "}
              <Link
                to="/files/Refund_blank_SHOP_RU.pdf"
                target="_blank"
                download
              >
                Скачать
              </Link>{" "}
              и заполнить заявление о возврате товара. Вложить данное заявление в посылку
            </p>
            <p>
            3. Фотографию или электронную копию заявления с номером отслеживания посылки направить на электронную почту sanek0020601@gmail.com.
            </p>
            <p>
            4. Выслать посылку можно только Почтой России обязательно на абонентский ящик: 111111, город Томск, ул. Пушкина 12.
            </p>
          </Row>
        </Container>
        <NavigationBlock />
      </Container>
    </>
  );
}
