import React from "react";
import Toast from "react-bootstrap/Toast";

function ToastError({ showToast, handleCloseToast, message }) {
  return (
    <Toast
      onClose={() => handleCloseToast()}
      show={showToast}
      delay={3000}
      autohide
      style={{ position: "fixed", zIndex: "99999", bottom: "10px", right: "10px" }}
    >
      <Toast.Header>
        <strong className="me-auto">Админ-панель</strong>
        <small>Только что</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastError;
