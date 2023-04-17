import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  NavLink,
  Row,
} from "react-bootstrap";
import { createReviews } from "../../http/reviewsAPI";
import { Rating } from "@material-ui/lab";

import { Context } from "../..";
import ModalTitle from "../UI/ModalTitle/ModalTitle";

export const CreateReview = ({
  modalReview,
  handleCloseReviews,
  size,
  productId,
  reRender,
}) => {
  const user = useContext(Context);

  const [descriptionTrueState, setDescriptionTrueState] = useState(true);
  const [sizeTrueState, setSizeTrueState] = useState(true);
  const [deliveryTrueState, setDeliveryTrueState] = useState(true);
  const [rating, setRating] = useState(3);

  const [reviewText, setReviewText] = useState();
  const [fileReview, setFileReview] = useState(null);
  const [fileReviewTwo, setFileReviewTwo] = useState(null);
  const [fileReviewThree, setFileReviewThree] = useState(null);

  const createReviewsInModal = () => {
    const formData = new FormData();
    formData.append("text", reviewText);
    if (fileReview) {
      formData.append("imgFirst", fileReview);
    }
    if (fileReviewTwo) {
      formData.append("imgSecond", fileReviewTwo);
    }
    if (fileReviewThree) {
      formData.append("imgThird", fileReviewThree);
    }
    formData.append("descriptionRespond", descriptionTrueState);
    formData.append("sizeRespond", sizeTrueState);
    formData.append("deliveryRespond", deliveryTrueState);
    formData.append("productId", productId);
    formData.append("rate", rating);
    formData.append("userId", user.user.user.id);
    formData.append("size", size);
    createReviews(formData).then((data) => {
      handleCloseReviews();
      reRender();
    });
  };

  return (
    <>
      <Modal
        show={modalReview}
        onHide={handleCloseReviews}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <ModalTitle firstText={"Создание"} secondText={"отзыва"} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <p className="product_card-title mr-3 ml-3">
              <span className="red">Укажите </span> отзыв товара
            </p>
          </Row>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <p className="product_card-title mr-3 ml-3">
              <span className="red">Добавить </span> изображения
            </p>
          </Row>
          <Row className="mt-2">
            <Col xs={12} md={4}>
              <Row>
                <Col xs={12} className="mb-1">
                  {fileReview ? (
                    <Image
                      src={URL.createObjectURL(fileReview)}
                      width={"100%"}
                    />
                  ) : (
                    <Image
                      src="https://imgholder.ru/600x300/8493a8/adb9ca&text=Загрузите+изображение&font=kelson"
                      width={"100%"}
                    />
                  )}
                </Col>{" "}
                <Col xs={12}>
                  <Form.Control
                    className="mb-2"
                    type="file"
                    onChange={(e) => setFileReview(e.target.files[0])}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <Row>
                <Col xs={12} className="mb-1">
                  {fileReviewTwo ? (
                    <Image
                      src={URL.createObjectURL(fileReviewTwo)}
                      width={"100%"}
                    />
                  ) : (
                    <Image
                      src="https://imgholder.ru/600x300/8493a8/adb9ca&text=Загрузите+изображение&font=kelson"
                      width={"100%"}
                    />
                  )}
                </Col>
                <Col xs={12}>
                  <Form.Control
                    className="mb-2"
                    type="file"
                    onChange={(e) => setFileReviewTwo(e.target.files[0])}
                    disabled={fileReview ? false : true}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <Row>
                <Col xs={12} className="mb-1">
                  {fileReviewThree ? (
                    <Image
                      src={URL.createObjectURL(fileReviewThree)}
                      width={"100%"}
                    />
                  ) : (
                    <Image
                      src="https://imgholder.ru/600x300/8493a8/adb9ca&text=Загрузите+изображение&font=kelson"
                      width={"100%"}
                    />
                  )}
                </Col>{" "}
                <Col xs={12}>
                  <Form.Control
                    className="mb-2"
                    type="file"
                    onChange={(e) => setFileReviewThree(e.target.files[0])}
                    disabled={fileReviewTwo ? false : true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <p className="product_card-title mr-3 ml-3 mb-1">
              <span className="red">Оцените </span> товар
            </p>
          </Row>
          <Row>
            <Rating
              name="size-large"
              defaultValue={rating || 3}
              value={rating || 3}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Row>
          <Row>
            <p className="product_card-title mr-3 ml-3 mb-1">
              <span className="red">Оцените </span> соответствие
            </p>
          </Row>
          <Row>
            <Col xs={12} className="mb-2">
              Соответствует товар описанию?
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setDescriptionTrueState(e.target.value)}
              >
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </Form.Select>
            </Col>
            <Col xs={12} className="mb-2">
              {" "}
              Соответствует товар по размеры?
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSizeTrueState(e.target.value)}
              >
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </Form.Select>
            </Col>
            <Col xs={12} className="mb-2">
              Соответствует доставка описанию?
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setDeliveryTrueState(e.target.value)}
              >
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviews}>
            Закрыть
          </Button>
          <Button variant="success" onClick={() => createReviewsInModal()}>
            Добавить отзыв
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
