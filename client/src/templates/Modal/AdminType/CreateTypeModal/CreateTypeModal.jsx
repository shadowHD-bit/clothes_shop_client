import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Image } from "react-bootstrap";
import { createType } from "../../../../http/productAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import "./CreateTypeModal.scss";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";

const CreateType = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setFile(null);
    setValue("");
  }, [show]);

  const addType = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("img", file);
    createType(formData)
      .then(() => {
        onHide();
        setSysMessage("Новый тип добавлен!");
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
          <ModalTitle firstText={"Добавить"} secondText={"новый тип"} />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className="added-label">Введите название:</Form.Label>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Новый тип"}
            />
            <Form.Label className="mt-3 added-label">
              Добавте изображение:
            </Form.Label>
            <Form.Control type="file" onChange={selectFile} />
          </Form>
          <Form.Label className="mt-3 added-label">Демо:</Form.Label>

          {file ? (
            <Image src={URL.createObjectURL(file)} width={"100%"} />
          ) : (
            <Image
              width={"100%"}
              src="https://imgholder.ru/600x300/8493a8/000000&text=Изображение+типа&font=kelson"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={addType}>
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

export default CreateType;
