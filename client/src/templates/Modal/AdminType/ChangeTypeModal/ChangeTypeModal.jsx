import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { updateType } from "../../../../http/productAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";

const ChangeType = ({ show, onHide, id, name, img_now, reRender }) => {
  const [typeName, setTypeName] = useState(name);
  const [file, setFile] = useState(null);

  const updateTypeInModal = () => {
    const formData = new FormData();
    formData.append("name", typeName);
    if (file) {
      formData.append("img", file);
    }
    updateType(id, formData).then((data) => {
      onHide();
      reRender();
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <ModalTitle firstText={"Изменение"} secondText={"типа"} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Form.Label className="added-label">Название:</Form.Label>
              <Form.Control
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="Название бренда"
              ></Form.Control>
              <Form.Label className="added-label mt-3">Изображение:</Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <Form.Label className="added-label mt-3">Демо:</Form.Label>
              {file ? (
                <Image src={URL.createObjectURL(file)} width={"100%"} />
              ) : (
                <Image
                  src={process.env.REACT_APP_API_URL + "types/" + img_now}
                  width={"100%"}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => updateTypeInModal()}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ChangeType;
