import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { deleteProductSizeApi, updateCountSize } from "../../http/productAPI";

export default function ChangeSizeProduct({
  show,
  onHide,
  productId,
  sizeId,
  size,
  countProduct,
  productName,
  reRender,
}) {
  const [count, setCount] = useState(countProduct || 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCount(countProduct);
  }, [show]);

  const deleteSize = () => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("sizeId", sizeId);
    deleteProductSizeApi(formData).then((data) => {
      reRender();
      onHide();
    });
  };

  const updateSize = () => {
    if (count != null) {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("sizeId", sizeId);
      formData.append("count", count);
      updateCountSize(formData).then((data) => {
        reRender();
        onHide();
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
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
            placeholder="Введите количества"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-danger" onClick={() => deleteSize()}>Удалить</Button>
        <Button variant="outline-warning" onClick={() => updateSize()}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
