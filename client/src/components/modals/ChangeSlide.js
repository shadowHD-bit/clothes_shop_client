import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import {
  createSlider,
  fetchOneSlider,
  fetchSlider,
  updateSlider,
} from "../../http/sliderAPI";
import { Image } from "react-bootstrap";

const ChangeSlides = observer(({ show, onHide, id, reRender }) => {
  const [slider, setSlider] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    fetchOneSlider(id).then((data) => {
      setSlider(data);
      setTitle(data.title);
      setText(data.text);
    });
  }, []);

  const changeSlider = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    if (file) {
      formData.append("img", file);
    }
    updateSlider(id, formData).then((data) => {
      onHide();
      reRender();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить/изменить слайдер
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3"
            placeholder="Введите заголовок слайда"
          />

          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-3"
            placeholder="Введите текст слайда"
            type="text"
          />

          <Form.Control
            className="mt-3"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file !== "" ? (
            <Image
              src={URL.createObjectURL(file)}
              style={{ width: "100%" }}
            ></Image>
          ) : (
            <Image
              src={process.env.REACT_APP_API_URL + "slides/" + slider.img}
              style={{ width: "100%" }}
            ></Image>
          )}
        </Form>
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
  );
});

export default ChangeSlides;
