import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../../../http/productAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";

const CreateBrand = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  useEffect(() => {
    setFile(null);
    setValue("");
  }, [show]);

  const addBrand = () => {
    const formData = new FormData();
    formData.append("name", value);
    if (file) {
      formData.append("img", file);
    }
    createBrand(formData)
      .then(() => {
        onHide();
        setSysMessage("Новый бренд добавлен!");
        handleCloseToast();
        handleOpenToast();
        reRender();
        setValue("");
        setFile(null);
      })
      .catch((e) => {
        setSysMessage(e.response.data.message);
        handleCloseToast();
        handleOpenToast();
      });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <ModalTitle firstText={"Добавить"} secondText={"бренд"} />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className="added-label">Введите название:</Form.Label>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Введите название бренда"}
            />
            <Form.Label className="mt-3 added-label">
              Добавте изображение:
            </Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form>
          <Form.Label className="mt-3 added-label">Демо:</Form.Label>

          {file ? (
            <Image src={URL.createObjectURL(file)} width={"100%"} />
          ) : (
            <Image
              width={"100%"}
              src="https://imgholder.ru/600x300/8493a8/000000&text=Изображение+бренда&font=kelson"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => onHide()}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={() => addBrand()}>
            Добавить
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

export default CreateBrand;
