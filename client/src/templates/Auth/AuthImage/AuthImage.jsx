import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../../../utils/consts";

import "./AuthImage.scss";

export default function AuthImage() {
  return (
    <>
      <Col lg={6} xl={6} xxl={6} className="auth_card_right d-none d-lg-flex">
        <Row className="img_row h-100 w-100">
          <Col className="img_col h-100 w-100">
            <p className="register_text">
              Если ты все еще не зарегистрировался у нас на сайте, то сделай это
              прямо сейчас!
            </p>
            <Link to={REGISTRATION_ROUTE}>
              <Button className="register_btn">Зарегистрироваться</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
}
