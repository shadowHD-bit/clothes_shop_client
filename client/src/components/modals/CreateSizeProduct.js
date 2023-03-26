import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { createProductSize } from "../../http/productAPI";

export default function CreateSizeProduct({
  show,
  onHide,
  productId,
  sizeId,
  size,
  productName,
  reRender,
}) {
  const [count, setCount] = useState(0);

  const addSize = () => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("sizeId", sizeId);
    formData.append("count", count);
    createProductSize(formData).then((data) => {
      reRender();
      onHide();
    });
  };

  return (
    <Modal style={{'zIndex': 9999}} show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Укажите количество товара "{productName}" для размера {size}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-3"
            placeholder="Введите количество"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={() => addSize()}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
