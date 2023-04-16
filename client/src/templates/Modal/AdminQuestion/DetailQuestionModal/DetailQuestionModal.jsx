import React from "react";

import "./DetailQuestionModal.scss";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";
import { Button, Modal } from "react-bootstrap";
import { dateParse } from "../../../../utils/helpers/dateParse.helpers";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../../../utils/consts";

export default function DetailQuestionModal({
  show,
  handleCloseInfo,
  id_question,
  productId,
  userId,
  product,
  question_text,
  createdAt,
  answer,
}) {
  return (
    <>
      <Modal show={show} onHide={handleCloseInfo} centered>
        <Modal.Header closeButton>
          <ModalTitle firstText={"Информация о"} secondText={"вопросе"} />
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Вопрос: {question_text}</li>
            <hr />
            <li>ID вопроса: {id_question}</li>
            <li>ID пользователя: {userId}</li>
            <li>
              Товар: {product.name} (#
              <Link to={PRODUCT_ROUTE + "/" + productId}>{productId}</Link>)
            </li>
            <li>Дата вопроса: {dateParse(createdAt)}</li>
            <hr />
            <li>Ответ на вопрос: {answer != null ? answer.answerText : "-"}</li>
            <li>
              Дата ответа: {answer != null ? dateParse(answer.updatedAt) : "-"}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleCloseInfo()}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
