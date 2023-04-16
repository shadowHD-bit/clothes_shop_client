import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { fetchOneSlider, updateSlider } from "../../../../http/sliderAPI";
import ToastError from "../../../../components/Toast/Toast";
import useToast from "../../../../hooks/useToast";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import "./ChangeSlideModal.scss";

const ChangeSlides = ({ show, onHide, id, reRender }) => {
  const [slider, setSlider] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  useEffect(() => {
    fetchOneSlider(id).then((data) => {
      setSlider(data);
      setTitle(data.title);
      setText(data.text);
    });
  }, []);

  const changeSlider = () => {
    if (title && text) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      if (file) {
        formData.append("img", file);
      }
      updateSlider(id, formData)
        .then(() => {
          onHide();
          setSysMessage("Слайд обновлен!");
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
          <ModalTitle firstText={"Изменить"} secondText={"слайд"} />
        </Modal.Header>
        <Modal.Body>
          {" "}
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Введите текст слайда"
                  as={"textarea"}
                />
                <Form.Label className="added-label mt-3">
                  Задний фон:
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
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
                        background: `url(${
                          process.env.REACT_APP_API_URL + "slides/" + slider.img
                        })`,
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
            </Col>{" "}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row w-100">
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={() => changeSlider()}
            >
              Изменить
            </Button>
          </div>
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

export default ChangeSlides;
