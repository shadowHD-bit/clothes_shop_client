import React from "react";
import "./AdminRules.scss";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import { deleteRules, fetchRules } from "../../../../http/rulesAPI";
import CreateRule from "../../../../components/modals/CreateRule";
import RulesItemAdmin from "../../../../components/AdminItems/RulesItemAdmin";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const AdminRules = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchRules().then((data) => {
      setRules(data.rows);
    });
  }, []);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchRules().then((data) => {
      setRules(data.rows);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  console.log(rules);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Основные вопросы"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с разделом основных
                  вопросов...
                </Alert.Heading>
                <p>Здесь ты можешь:</p>
                <ul>
                  <li>Изменять созданные объяснения по разделу вопросов;</li>
                  <li>Создавать новые разделы вопросов;</li>
                  <li>Удалять созданные разделы вопросов.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={() => handleShowCreateModal()}>
              Добавить
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Наименование</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {rules?.map((item) => (
                <RulesItemAdmin reRender={reRender} item={item} />
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>

      <CreateRule
        reRender={reRender}
        show={showCreateModal}
        onHide={handleCloseCreateModal}
      />
    </>
  );
};
export default AdminRules;
