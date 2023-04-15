import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
const DetailsPostedReview = ({ show, handleClose, review }) => {
  console.log(review);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация об отзыве</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>Текст отзыва: {review[0]?.text}</Col>
          </Row>
          <Row>
            <Col>
              Соответствие описанию:{" "}
              {review[0]?.descriptionRespond
                ? "Cоответствует"
                : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col>
              Соответствие размера:{" "}
              {review[0]?.sizeRespond ? "Cоответствует" : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col>
              Соответствие доставки:{" "}
              {review[0]?.deliveryRespond ? "Cоответствует" : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              {review[0]?.imgFirst == null ? (
                "Изображение не прикреплено!"
              ) : (
                <img
                  width={"100%"}
                  src={process.env.REACT_APP_API_URL + 'reviews/' + review[0]?.imgFirst}
                />
              )}
            </Col>
            <Col xs={4}>
              {review[0]?.imgSecond == null ? (
                "Изображение не прикреплено!"
              ) : (
                <img
                  width={"100%"}
                  src={process.env.REACT_APP_API_URL + 'reviews/' + review[0]?.imgSecond}
                />
              )}
            </Col>
            <Col xs={4}>
              {review[0]?.imgThird == null ? (
                "Изображение не прикреплено!"
              ) : (
                <img
                  width={"100%"}
                  src={process.env.REACT_APP_API_URL + 'reviews/' + review[0]?.imgThird}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleClose()}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DetailsPostedReview;
