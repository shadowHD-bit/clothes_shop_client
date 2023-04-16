import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import {
  createBadge,
  deleteBadge,
  fetchBadge,
} from "../../../../http/productAPI";
import "./BadgeAdmin.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import useRerender from "../../../../hooks/useRerender";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";
import BadgeItemAdmin from "../../../../components/AdminItems/BadgeItemAdmin";

const BadgeAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [badges, setBadges] = useState([]);
  const [valueBadge, setValueBadge] = useState("");

  const { render, reRender } = useRerender();

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  useEffect(() => {
    fetchBadge().then((data) => {
      if (data) {
        setBadges(data.rows);
      }
    });
  }, [render]);

  const addedBadge = () => {
    const formData = new FormData();
    if (valueBadge != "") {
      formData.append("name", valueBadge);
      createBadge(formData)
        .then(() => {
          setSysMessage("Бадж добавлен!");
          handleOpenToast();
          setValueBadge("");
          reRender();
        })
        .catch((e) => {
          setSysMessage(e.response.data.message);
          handleOpenToast();
        });
    } else {
      setSysMessage("Введите название баджа!");
      handleOpenToast();
    }
  };

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Баджи"'} />
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с баджами товара...
                </Alert.Heading>
                <p>Здесь ты можешь работать с размерами:</p>
                <ul>
                  <li>
                    Если необходимо добавить бадж, то введи необходимый название
                    баджа и нажми кнопку "Добавить".
                  </li>
                  <li>
                    Если необходимо удалить бадж, то выбири бадж из списка и
                    нажми на иконку корзины.
                  </li>
                </ul>
                <p>
                  ВНИМАНИЕ! Если вы удалите бадж, который указан в параметрах
                  товара, то этот параметр будет удален и из характеристик
                  товара!
                </p>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Control
                type="text"
                placeholder="Введите наименование баджа"
                value={valueBadge}
                onChange={(e) => setValueBadge(e.target.value)}
              />
            </Form>
          </Col>
          <Col>
            <Button variant="outline-success" onClick={() => addedBadge()}>
              Добавить
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          {badges?.map((item) => (
            <BadgeItemAdmin
              name={item.name}
              id={item.id}
              reRender={reRender}
              key={item.id}
            />
          ))}
        </Row>
      </Container>

      {showToast && (
        <ToastError
          showToast={showToast}
          handleCloseToast={handleCloseToast}
          message={sysMessage}
        />
      )}
    </>
  );
};
export default BadgeAdmin;
