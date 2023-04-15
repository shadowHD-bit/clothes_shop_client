import React, { useState } from "react";

import "./AdminTitle.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../AdminSideBar/SideBar";

export default function AdminTitle({ charter }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <>
      <Container fluid="md">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-danger"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель <span className="red">(v.1.3)</span>
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>{charter}</Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
}
