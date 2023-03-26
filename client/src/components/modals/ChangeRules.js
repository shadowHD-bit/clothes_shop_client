import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Image } from "react-bootstrap";
import { fetchOneRules, fetchRules, updateRules } from "../../http/rulesAPI";

const ChangeRules = observer(({ show, onHide, id_rule, reRender }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [rule, setRule] = useState({});

  useEffect(() => {
    fetchOneRules(id_rule).then((data) => {
      setRule(data);
      setTitle(data.title);
      setText(data.information);
    });
  }, []);

  const changeRule = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("information", text);
    updateRules(id_rule, formData).then((data) => {
      reRender();
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить информацию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3"
            placeholder="Введите заголовок правила"
          />
          <Form.Control
            as="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-3"
            placeholder="Введите текст описания правила"
            type="text"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row w-100">
          <Button
            variant="outline-success"
            className="mr-2"
            onClick={() => changeRule()}
          >
            Изменить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeRules;
