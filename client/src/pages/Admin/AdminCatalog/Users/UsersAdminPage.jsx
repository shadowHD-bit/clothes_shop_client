import React, { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import "./UsersAdminPage.scss";
import { getAllUserForAdmin } from "../../../../http/userAPI";
import UserItemAdmin from "../../../../components/AdminItems/UserItemAdmin";
import useDebounce from "../../../../hooks/useDebounce";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const UsersAdminPage = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(5);

  const [activePage, setActivePage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    getAllUserForAdmin(1, 6, "").then((data) => {
      setUsersCount(data.count);
      setUsers(data.rows);

      let arrayNumbersPage = [];
      for (let i = 1; i <= Math.ceil(data.count / 6); i++) {
        arrayNumbersPage.push(i);
      }
      setPageNumbers(arrayNumbersPage);
    });
  }, []);

  const [render, setRender] = useState(false);

  useEffect(() => {
    getAllUserForAdmin(1, 6, "").then((data) => {
      setUsersCount(data.count);
      setUsers(data.rows);

      let arrayNumbersPage = [];
      for (let i = 1; i <= Math.ceil(data.count / 6); i++) {
        arrayNumbersPage.push(i);
      }
      setPageNumbers(arrayNumbersPage);
    });
  }, [render]);

  const reRender = () => {
    setRender(!render);
  };

  //----------------------

  const changePage = (numberPage) => {
    setActivePage(numberPage);
    getAllUserForAdmin(numberPage, 6, "").then((data) => {
      setUsersCount(data.count);
      setUsers(data.rows);
    });
  };

  //----------------------

  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    async function fetchData() {
      setUsers([]);
      const data = await getAllUserForAdmin(1, 6, searchValue);
      setUsers(data.rows);
      setUsersCount(data.count);

      let arrayNumbersPage = [];
      for (let i = 1; i <= Math.ceil(data.count / 6); i++) {
        arrayNumbersPage.push(i);
      }
      setPageNumbers(arrayNumbersPage);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Пользователи"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="info"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с пользователями...
                </Alert.Heading>
                <p>Здесь ты можешь:</p>
                <ul>
                  <li>Удалить пользователя;</li>
                  <li>Заблокировать пользователя;</li>
                  <li>Назначить администратора;</li>
                  <li>Просмотреть основную информацию о пользователе;</li>
                </ul>
                <p>
                  ВНИМАНИЕ! Удаление пользователя необходимо соглосовывать с
                  другими администраторами! Удаление пользователя приведет к
                  удалению всех данных, которые были с ним связаны (заказы,
                  сообщения и т.д.). РЕКОМЕНДУЕМ блокировать пользователя в
                  случае нарушения правил сервиса!
                </p>
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
              <Accordion.Header>Список пользователей</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <Form className="mb-2">
                      {" "}
                      <Form.Control
                        type="text"
                        placeholder="Введите имя или фамилию пользователя"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </Form>
                  </Col>
                </Row>
                <Table striped bordered hover className="p-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Аватар</th>
                      <th>ФИО</th>
                      <th>Роль</th>
                      <th>Дата регистрации</th>
                      <th>Подробнее</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <UserItemAdmin
                        key={user.id}
                        props={user}
                        reRender={reRender}
                      />
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                  {pageNumbers.map((page) => (
                    <Pagination.Item
                      key={page}
                      active={page === activePage}
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};
export default UsersAdminPage;
