import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import QuestionItemAdmin from "../../../../components/AdminItems/QuestionItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchQuestion } from "../../../../http/questionAPI";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const AdminQuestion = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [stateAccordion, setStateAccordion] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [currentPageQuestion, setCurrentPageQuestion] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0);
  const [filterQuestion, setFilterQuestion] = useState("all");
  const [rerenderQuestions, setRerenderQuestion] = useState(false);

  //Question pagination
  const limitQuestion = 5;
  const pageCountQuestion = Math.ceil(Number(countQuestion) / limitQuestion);
  const pagesQuestion = [];

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1, complete: filterQuestion }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1, complete: filterQuestion}).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: currentPageQuestion, complete: filterQuestion }).then(
      (data) => {
        setQuestions(data);
      }
    );
  }, [currentPageQuestion]);

  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: 1,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
      console.log(data);
    });
  }, [filterQuestion]);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: currentPageQuestion,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
    });
  }, [rerenderQuestions]);

  const reRenderQuestion = () => {
    setRerenderQuestion(!rerenderQuestions);
  };

  //Question pagination
  for (
    let numberQuestion = 1;
    numberQuestion < pageCountQuestion + 1;
    numberQuestion++
  ) {
    pagesQuestion.push(
      <Pagination.Item
        key={numberQuestion}
        active={numberQuestion === currentPageQuestion}
        onClick={() => setCurrentPageQuestion(numberQuestion)}
      >
        {numberQuestion}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Вопросы"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
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
              <Accordion.Header>Список вопросов</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col
                    xs={12}
                    className="mt-3 d-flex justify-content-center align-items-center"
                  >
                    <div className="mr-3">Фильтр:</div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        {filterQuestion == "all"
                          ? "Все"
                          : filterQuestion == "completed"
                          ? "Закрытые"
                          : "Не закрытые"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filterQuestion === "all" ? (
                          <Dropdown.Item disabled>Все</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("all")}
                          >
                            Все
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "completed" ? (
                          <Dropdown.Item disabled>Закрытые</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("completed")}
                          >
                            Закрытые
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "not-completed" ? (
                          <Dropdown.Item disabled>Не Закрытые</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("not-completed")}
                          >
                            Не Закрытые
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID вопроса</th>
                      <th>ID товара</th>
                      <th>ID пользователя</th>
                      <th>Название товара</th>
                      <th>Дата создания вопроса</th>
                      <th>Статус</th>
                      <th>Дата изменения</th>
                      <th>Подробнее</th>
                      <th>Завершить</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.rows?.map(
                      ({
                        id,
                        userId,
                        productId,
                        createdAt,
                        updatedAt,
                        isComplete,
                        questionText,
                        product,
                        answer,
                      }) => (
                        <QuestionItemAdmin
                          key={id}
                          id_question={id}
                          userId={userId}
                          productId={productId}
                          question_text={questionText}
                          product_name={productId}
                          completeQuestion={isComplete}
                          updatedAt={updatedAt}
                          createdAt={createdAt}
                          product={product}
                          answer={answer}
                          reRenderQuestion={reRenderQuestion}
                        />
                      )
                    )}
                  </tbody>
                </Table>
                <Pagination
                  size="sm"
                  className="mt-4 mb-4"
                  style={{ margin: "0 auto" }}
                >
                  {pagesQuestion}
                </Pagination>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};
export default AdminQuestion;
