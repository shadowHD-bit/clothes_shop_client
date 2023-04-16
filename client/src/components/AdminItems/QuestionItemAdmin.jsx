import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Context } from "../..";
import { createAnswer, updateAnswerText } from "../../http/answerAPI";
import { changeStatusQuestion, deleteQuestion } from "../../http/questionAPI";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { dateParse } from "../../utils/helpers/dateParse.helpers";
import DetailQuestionModal from "../../templates/Modal/AdminQuestion/DetailQuestionModal/DetailQuestionModal";
import CreateAnswerModal from "../../templates/Modal/AdminQuestion/CreateAnswerModal/CreateAnswerModal";
import ChangeAnswerModal from "../../templates/Modal/AdminQuestion/ChangeAnswerModal/ChangeAnswerModal";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";

const QuestionItemAdmin = ({
  id_question,
  userId,
  productId,
  createdAt,
  completeQuestion,
  product,
  answer,
  reRenderQuestion,
  question_text,
}) => {
  const [modalInfo, setShowInfo] = useState(false);
  const [modalDelete, setShowDelete] = useState(false);
  const [modalAnswer, setShowAnswer] = useState(false);
  const [modalChangeAnswer, setShowChangeAnswer] = useState(false);

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseAnswer = () => setShowAnswer(false);
  const handleShowAnswer = () => setShowAnswer(true);

  const handleCloseChangeAnswer = () => setShowChangeAnswer(false);
  const handleShowChangeAnswer = () => setShowChangeAnswer(true);

  const deleteQA = (id) => {
    deleteQuestion({ id }).then(() => {
      handleCloseDelete();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  return (
    <>
      <tr>
        <td>{id_question}</td>
        <td>
          <a href={PRODUCT_ROUTE + "/" + productId}>{productId}</a>
        </td>
        <td>{completeQuestion ? "Есть ответ" : "Нет ответа"}</td>
        <td>{question_text}</td>
        <td>
          <Button variant="info" onClick={() => handleShowInfo()}>
            Подробнее
          </Button>
        </td>
        <td>
          {answer != null ? (
            <Button variant="success" onClick={() => handleShowChangeAnswer()}>
              Изменить
            </Button>
          ) : (
            <Button variant="success" onClick={() => handleShowAnswer()}>
              Ответить
            </Button>
          )}
        </td>
        <td>
          <Button variant="danger" onClick={handleShowDelete}>
            Удалить
          </Button>
        </td>
      </tr>
      {modalInfo && (
        <DetailQuestionModal
          show={modalInfo}
          handleCloseInfo={handleCloseInfo}
          id_question={id_question}
          productId={productId}
          userId={userId}
          product={product}
          question_text={question_text}
          createdAt={createdAt}
          answer={answer}
        />
      )}

      {modalAnswer && (
        <CreateAnswerModal
          show={modalAnswer}
          handleClose={handleCloseAnswer}
          question_text={question_text}
          id_question={id_question}
          reRender={reRenderQuestion}
          completeQuestion={completeQuestion}
        />
      )}

      {modalChangeAnswer && (
        <ChangeAnswerModal
          show={modalChangeAnswer}
          handleClose={handleCloseChangeAnswer}
          question_text={question_text}
          createdAt={createdAt}
          reRenderQuestion={reRenderQuestion}
          productId={productId}
          product={product}
          answer={answer}
          id_question={id_question}
          userId={userId}
        />
      )}

      {modalDelete && (
        <DeleteSureModal
          text={`Вы уверены, что хотите удалить данный вопрос № ${id_question}?`}
          show={modalDelete}
          handleClose={handleCloseDelete}
          action={() => deleteQA(id_question)}
          reRender={reRenderQuestion}
        />
      )}
    </>
  );
};
export default QuestionItemAdmin;
