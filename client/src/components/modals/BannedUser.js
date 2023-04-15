import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { bannedUserApi } from "../../http/userAPI";
import ToastError from "../Toast/Toast";

export default function BannedUser({
  show,
  handleClose,
  userId,
  email,
  reRender,
}) {
  const [showToast, setShowToast] = useState(false);
  const [thisMessage, setThisMessage] = useState("");

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const [valueReason, setValueReason] = useState("");

  const banned = () => {
    bannedUserApi({ email: email, reason: valueReason, userId: userId })
      .then((data) => {
        handleClose();
        reRender();
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
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Блокировка пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            Блокировка пользователя осуществляется в соответтвии с правилами
            веб-сервиса! Указываете подробную причину блокировки...
          </Alert>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Укажите причину блокировки:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={valueReason}
              onChange={(e) => setValueReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => banned()}>
            Заблокировать
          </Button>
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
