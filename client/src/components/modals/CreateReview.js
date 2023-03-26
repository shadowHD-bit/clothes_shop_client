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

export const CreateReview = ({
  modalReview,
  handleCloseReviews,
  size,
  productId, reRender
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
    if(fileReview){
      formData.append("imgFirst", fileReview);
    }
    if(fileReviewTwo){
      formData.append("imgSecond", fileReviewTwo);
    }
    if(fileReviewThree){
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
      reRender()
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
          <Modal.Title id="example-custom-modal-styling-title">
            Создание отзыва
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          Введите свой отзыв:
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            onChange={(e) => setReviewText(e.target.value)}
          />
          <br />
          Добавить изображение:
          <Form.Control className="mb-2" type="file" onChange={e => setFileReview(e.target.files[0])} />
          <Form.Control className="mb-2" type="file" onChange={e => setFileReviewTwo(e.target.files[0])} />
          <Form.Control className="mb-2" type="file" onChange={e => setFileReviewThree(e.target.files[0])} />
          <br />
          <Rating
            name="size-large"
            defaultValue={rating || 3}
            value={rating || 3}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
          <br />
          Соответствует товар описанию?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDescriptionTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
          <br />
          Соответствует товар по размеры?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSizeTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
          <br />
          Соответствует доставка описанию?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDeliveryTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
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
