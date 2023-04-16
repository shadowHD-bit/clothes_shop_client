import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createSlider } from "../../../../http/sliderAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import "./CreateSlideModal.scss";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";

const CreateSlider = ({ show, onHide, reRender }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
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

  const addSlider = () => {
    const formData = new FormData();
    if (title && text && file) {
      formData.append("title", title);
      formData.append("text", text);
      formData.append("img", file);
      createSlider(formData)
        .then(() => {
          onHide();
          setSysMessage("Слайд добавлен!");
          handleOpenToast();
          reRender();
        })
        .catch((e) => {
          setSysMessage(e.response.data.message);
          handleOpenToast();
        });
    } else {
      setSysMessage("Заполните все поля!");
      handleOpenToast();
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <ModalTitle firstText={"Добавить"} secondText={"слайд"} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12} xl={6}>
              <Form>
                <Form.Label className="added-label">Заголовок:</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите заголовок слайда"
                />
                <Form.Label className="added-label mt-3">Текст:</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Введите текст слайда"
                  type="text"
                />
                <Form.Label className="added-label mt-3">
                  Задний фон:
                </Form.Label>
                <Form.Control type="file" onChange={selectFile} />
              </Form>
            </Col>
            <Col lg={12} xl={6}>
              <p className="added-label">Демо:</p>
              <div
                className="demo-slide"
                style={
                  file
                    ? { background: `url(${URL.createObjectURL(file)})` }
                    : {
                        background: `url(https://imgholder.ru/600x350/8493a8/adb9ca&text=Загрузите+фон&font=kelson)`,
                      }
                }
              >
                <div className="black-mask">
                  <Row className="info p-0 m-0">
                    <Col
                      xs={8}
                      className="text-block p-0 m-0 text-center d-flex flex-column align-items-center justify-content-end"
                    >
                      <p className="info title">{title}</p>
                      <p className="info text">{text}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={addSlider}>
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

export default CreateSlider;
