import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import { dateParse } from "../../../../utils/helpers/dateParse.helpers";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../../../utils/consts";
import { updateAnswerText } from "../../../../http/answerAPI";

export default function ChangeAnswerModal({
  show,
  handleClose,
  question_text,
  createdAt,
  id_question,
  productId,
  product,
  answer,
  userId,
  reRenderQuestion,
}) {
  const [changeText, setChangeText] = useState(answer.answerText || "");

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  const changeAnswerText = () => {
    if (changeText) {
      updateAnswerText(answer.id, { answerText: changeText })
        .then(() => {
          handleClose();
          setSysMessage("Ваш ответ зафиксирован!");
          handleOpenToast();
          setTimeout(() => reRenderQuestion(), 250);
        })
        .catch((e) => {
          setSysMessage(e.response.data.message);
          handleOpenToast();
        });
    } else {
      setSysMessage("Заполните поле ответа!");
      handleOpenToast();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <ModalTitle firstText={"Изменить"} secondText={"ответ"} />
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>ID вопроса: {id_question}</li>
            <li>ID пользователя: {userId}</li>
            <li>
              Товар: {product.name} (#
              <Link to={PRODUCT_ROUTE + "/" + productId}>{productId}</Link>)
            </li>
            <li>Вопрос: {question_text}</li>
            <li>Дата вопроса: {dateParse(createdAt)}</li>
          </ul>
          Ответ:
          <InputGroup>
            <Form.Control
              value={changeText}
              as="textarea"
              onChange={(e) => setChangeText(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => changeAnswerText()}>
            Сохранить изменения
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
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
}
