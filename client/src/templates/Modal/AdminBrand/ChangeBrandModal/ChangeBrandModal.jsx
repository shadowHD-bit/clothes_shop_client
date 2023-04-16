import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { updateBrand } from "../../../../http/productAPI";
import ToastError from "../../../../components/Toast/Toast";
import useToast from "../../../../hooks/useToast";

const ChangeBrand = ({ show, onHide, img_now, id, name, reRender }) => {
  const [brandName, setBrandName] = useState(name);
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  const updateBrandInModal = () => {
    if (brandName) {
      const formData = new FormData();
      formData.append("name", brandName);
      formData.append("img", file);
      updateBrand(id, formData).then((data) => {
        onHide();
        reRender();
      });
    } else {
      setSysMessage("Заполните название бренда!");
      handleCloseToast();
      handleOpenToast();
    }
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
          <Modal.Title id="contained-modal-title-vcenter">
            Изменение бренда "{name}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Form.Label className="added-label">Название:</Form.Label>
              <Form.Control
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Название бренда"
              ></Form.Control>
              <Form.Label className="added-label mt-3">Изображение:</Form.Label>
              <Form.Control type="file" onChange={selectFile} />
              <Form.Label className="added-label mt-3">Демо:</Form.Label>
              {file ? (
                <Image src={URL.createObjectURL(file)} width={"100%"} />
              ) : (
                <Image
                  src={process.env.REACT_APP_API_URL + "brands/" + img_now}
                  width={"100%"}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => updateBrandInModal()}>
            Изменить
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
};
export default ChangeBrand;
