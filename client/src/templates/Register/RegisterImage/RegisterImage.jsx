import React from "react";
import { Col, Row } from "react-bootstrap";

import './RegisterImage.scss'

export default function RegisterImage() {
  return (
    <>
      <Col lg={7} xl={7} xxl={7} className="reg_card_left d-none d-lg-flex">
        <Row className="img_row h-100 w-100">
          <Col className="img_col h-100 w-100">
            <p className="register_text">
              Присоединяйся к нам, чтобы быть всегда в центре внимания...
            </p>
          </Col>
        </Row>
      </Col>
    </>
  );
}
