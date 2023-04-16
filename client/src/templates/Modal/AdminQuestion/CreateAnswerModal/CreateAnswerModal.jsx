import React, { useContext, useState } from "react";
import { Context } from "../../../..";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import { createAnswer } from "../../../../http/answerAPI";
import { changeStatusQuestion } from "../../../../http/questionAPI";
import ToastError from "../../../../components/Toast/Toast";
import useToast from "../../../../hooks/useToast";

export default function CreateAnswerModal({
  show,
  handleClose,
  question_text,
  id_question,
  reRender,
  completeQuestion
}) {
  const { user } = useContext(Context);

  const [stateAnswer, setStateAnswer] = useState("");

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  const addAnswer = () => {
    if (stateAnswer) {
      const formDataAnswer = new FormData();
      formDataAnswer.append("questionId", id_question);
      formDataAnswer.append("userId", user.user.id);
      formDataAnswer.append("answerText", stateAnswer);
      createAnswer(formDataAnswer);
      changeStatusQuestion({
        complete_question: !completeQuestion,
        id_question: id_question,
      })
        .then(() => {
          handleClose();
          setSysMessage('Ваш ответ зафиксирован!');
          handleOpenToast();
          setTimeout(() => reRender(), 250);
        })
        .catch((e) => {
          setSysMessage(e.response.data.message);
          handleOpenToast();
        });
    } else {
      setSysMessage("Укажите ответ!");
      handleOpenToast();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle firstText={"Ответить на"} secondText={"вопрос"} />
        </Modal.Header>
        <Modal.Body>
          Вопрос: {question_text}
          <br />
          Введите ответ:
          <InputGroup>
            <Form.Control
              value={stateAnswer}
              as="textarea"
              onChange={(e) => setStateAnswer(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="danger" onClick={() => addAnswer()}>
            Добавить ответ
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
