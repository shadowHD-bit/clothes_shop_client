import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function ToastError({ show, onHide, message }) {
  return (
    <Toast
      onClose={() => onHide()}
      show={show}
      delay={3000}
      autohide
      style={{ position: "fixed", zIndex: "9999", bottom: "10px", right: "10px" }}
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
