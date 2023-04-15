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
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import {
  createBadge,
  deleteBadge,
  deleteBrand,
  fetchBadge,
} from "../../../../http/productAPI";
import "./BadgeAdmin.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const BadgeAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [badges, setBadges] = useState([]);
  const [valueBadge, setValueBadge] = useState("");

  useEffect(() => {
    fetchBadge().then((data) => {
      if (data) {
        setBadges(data.rows);
      }
    });
  }, []);

  const addedBadge = () => {
    const formData = new FormData();
    if (valueBadge != "") {
      formData.append("name", valueBadge);
      createBadge(formData).then((data) => {
        fetchBadge().then((data) => {
          if (data) {
            setValueBadge("");
            setBadges(data.rows);
          }
        });
      });
    }
  };

  const deleteBad = (id) => {
    deleteBadge(id).then((data) => {
      fetchBadge().then((data) => {
        if (data) {
          setValueBadge("");
          setBadges(data.rows);
        }
      });
    });
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
            <ButtonGroup size="mb" style={{ width: "fit-content" }}>
              <Button variant="danger" disabled={true}>
                {item.name}
              </Button>
              <Button variant="danger" onClick={() => deleteBad(item.id)}>
                <BsTrash />
              </Button>
            </ButtonGroup>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default BadgeAdmin;
