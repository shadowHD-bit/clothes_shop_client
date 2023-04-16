import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { unbannedUserApi } from "../../../../http/userAPI";
import { dateParse } from "../../../../utils/helpers/dateParse.helpers";

export default function UnbannedUser({
  show,
  handleClose,
  userId,
  email,
  reason,
  bannedDate,
  reRender,
}) {
  const unbanned = () => {
    unbannedUserApi(userId, email).then((data) => {
      handleClose();
      reRender();
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
          <Modal.Title>Разблокировка пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: 18 }}>
            <b>Вы уверены, что хотите разблокировать пользователя?</b>
          </p>
          <p>
            <b>Причина блокировки:</b> {reason}
          </p>
          <p>
            <b>Дата блокировки:</b> {dateParse(bannedDate)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => unbanned()}>
            Заблокировать
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
