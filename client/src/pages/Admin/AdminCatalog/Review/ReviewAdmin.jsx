import React, { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import ReviewItemAdmin from "../../../../components/AdminItems/ReviewItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchReviews } from "../../../../http/reviewsAPI";
import "./ReviewAdmin.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const ReviewAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [stateAccordion, setStateAccordion] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [rerenderReview, setRerenderReview] = useState(false);

  useEffect(() => {
    fetchReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchReviews().then((data) => {
      setReviews(data);
    });
  }, [rerenderReview]);

  const reRender = () => {
    setRerenderReview(!rerenderReview);
  };

  console.log(reviews);
  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Отзывы"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с вопросами...
                </Alert.Heading>
                <p>Здесь ты можешь работать с вопросами:</p>
                <ul>
                  <li>
                    Если вопрос задан не по теме или содержит элементы цензуры,
                    то возможно удалить вопрос, нажав на кнопку "Удалить" в
                    строке соответствующего вопроса в таблице.
                  </li>
                  <li>
                    Если необходимо изменить ответ на вопрос, то нажмите кнопку
                    "Изменить" в строке соответствующего вопроса.
                  </li>
                  <li>
                    Чтобы просмотреть текст вопроса и увидеть всю информацию о
                    вопросе, нажмите кнопку "Информация" в соответствующей
                    строке вопроса в таблице.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>Список отзывов</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID отзыва</th>
                      <th>ID товара</th>
                      <th>Подробнее</th>
                      <th>Статус публикации</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.rows?.map((item) => (
                      <ReviewItemAdmin
                        key={item.id}
                        review_data={item}
                        reRender={reRender}
                      />
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};
export default ReviewAdmin;
