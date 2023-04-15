import React from "react";
import { Button, Modal } from "react-bootstrap";
import ModalTitle from "../../../components/UI/ModalTitle/ModalTitle";
import "./DeleteSureModal.scss";
import useToast from "../../../hooks/useToast";
import ToastError from "../../../components/Toast/Toast";

export default function DeleteSureModal({
  text,
  show,
  handleClose,
  action,
  reRender,
}) {
  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  const actionDelete = async () => {
    action()
      .then(() => {
        handleClose();
        reRender();
      })
      .catch((e) => {
        setSysMessage(e.response.data.message);
        handleOpenToast();
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
          <ModalTitle firstText={"Подтвердите"} secondText={"действие!"} />
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => actionDelete()}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>

      {showToast && (
        <ToastError
          showToast={showToast}
          handleCloseToast={handleCloseToast}
          message={sysMessage}
        />
      )}
    </>
  );
}
