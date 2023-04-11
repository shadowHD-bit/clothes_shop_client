import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { changeRoleUser } from "../../http/userAPI";
import ToastError from "../../component/Toast/Toast";

export default function ChangeRole({
  show,
  handleClose,
  firstName,
  secondName,
  userId,
  role,
  reRender,
}) {
  const [showToast, setShowToast] = useState(false);
  const [thisMessage, setThisMessage] = useState("");

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const changeRole = (role) => {
    changeRoleUser(userId, role)
      .then(() => {
        reRender();
        handleClose();
      })
      .catch((e) => {
        setThisMessage(e.response.data.message);
        setShowToast(true);
      });
  };

  return (
    <>
      <Modal
        show={show}
        handleClose={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Изменение роли пользователя {firstName + " " + secondName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Выберите новую роль пользователя:</p>
          <Row>
            <Col xs={12}>
              <Button
                onClick={() => changeRole("USER")}
                className="w-100 mb-2"
                variant="outline-success"
                disabled={role == "USER" ? true : false}
              >
                Пользователь
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                onClick={() => changeRole("ADMIN")}
                className="w-100 mb-2"
                variant="outline-danger"
                disabled={role == "ADMIN" ? true : false}
              >
                Администратор
              </Button>
            </Col>

            <p>Недоступные роли:</p>

            <Col xs={12}>
              <Button className="w-100 mb-2" variant="outline-warning" disabled>
                Менеджер
              </Button>
            </Col>
            <Col xs={12}>
              <Button className="w-100 mb-2" variant="outline-warning" disabled>
                Владелец
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

      <ToastError
        onHide={() => handleCloseToast()}
        show={showToast}
        message={thisMessage}
      />
    </>
  );
}
