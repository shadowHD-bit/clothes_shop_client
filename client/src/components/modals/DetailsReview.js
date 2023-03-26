import React from "react";
import { Button, Image, Modal, Table } from "react-bootstrap";

const DetailsReview = ({ show, handleClose, review_data }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация о отзыве №{review_data.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID отзыва</th>
                <th>{review_data.id}</th>
              </tr>
              <tr>
                <th>ID товара</th>
                <th>{review_data.productId}</th>
              </tr>
              <tr>
                <th>Наименование товара</th>
                <th>{review_data.product.name}</th>
              </tr>
              <tr>
                <th>ID пользователя</th>
                <th>{review_data.user.id}</th>
              </tr>
              <tr>
                <th>ФИО пользователя</th>
                <th>
                  {review_data.user.firstName}{" "}
                  {review_data.user.secondName}
                </th>
              </tr>
              <tr>
                <th>Текст отзыва</th>
                <th>{review_data.text}</th>
              </tr>
              <tr>
                <th>Изображение 1</th>
                <th>
                  {review_data.imgFirst === null ? (
                    "Нет изображения"
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + 'reviews/'+ review_data.imgFirst
                      }
                      width={150}
                    ></Image>
                  )}
                </th>
              </tr>
              <tr>
                <th>Изображение 2</th>
                <th>
                  {review_data.imgSecond === null ? (
                    "Нет изображения"
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + 'reviews/'+ review_data.imgSecond
                      }
                      width={150}
                    ></Image>
                  )}
                </th>
              </tr>
              <tr>
                <th>Изображение 3</th>
                <th>
                  {review_data.imgThird === null ? (
                    "Нет изображения"
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + 'reviews/'+ review_data.imgThird
                      }
                      width={150}
                    ></Image>
                  )}
                </th>
              </tr>
              <tr>
                <th>Соответствие описанию</th>
                <th>
                  {review_data.descriptionRespond
                    ? "Соответствует"
                    : "Не оответствует"}
                </th>
              </tr>
              <tr>
                <th>Соответствие размеру</th>
                <th>
                  {review_data.sizeRespond ? "Соответствует" : "Не оответствует"}
                </th>
              </tr>
              <tr>
                <th>Соответствие доставки</th>
                <th>
                  {review_data.deliveryRespond
                    ? "Соответствует"
                    : "Не оответствует"}
                </th>
              </tr>
            </tbody>
          </Table>
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
export default DetailsReview;
