import React, { Suspense, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import "./modal.scss";
import { fetchOrdersUser, getOneOrderProducts } from "../../http/orderAPI";
import DetailOrdersForAdmin from "./DetailOrdersForAdmin";
import ChangeRole from "./ChangeRole";
import BannedUser from "./BannedUser";
import UnbannedUser from "./UnbannedUser";

export default function DetailUser({ show, handleClose, data, reRender }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersUser({
      userId: data.id,
      limit: 100,
      page: 1,
      complete: "All",
    }).then((data) => {
      setOrders(data.rows);
    });
  }, []);

  const [chooseOrderDetailId, setChooseOrderDetailId] = useState(1);
  const [chooseOrderDetail, setChooseOrderDetail] = useState({
    detail: {},
    description: {},
    products: {},
  });
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleCloseDetailModal = () => setShowDetailModal(false);

  const viewDetailOrder = (id) => {
    getOneOrderProducts(id).then((data) => {
      setChooseOrderDetailId(id);
      setChooseOrderDetail(data);
      setShowDetailModal(true);
    });
  };

  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const handleCloseChangeRoleUserModal = () => setShowChangeRoleModal(false);

  const [showBannedUserModal, setShowBannedUserModal] = useState(false);
  const handleShowBannedUserModal = () => setShowBannedUserModal(false);

  const [showUnbannedUserModal, setShowUnbannedUserModal] = useState(false);
  const handleShowUnbannedUserModal = () => setShowUnbannedUserModal(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация о пользователе</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              {data.bannedUser.length !== 0 ? (
                <Alert variant="danger">
                  <Alert.Heading>
                    Данный аккаунт пользователя заблокирован!
                  </Alert.Heading>
                  <p>Причина блокировки: {data.bannedUser[0].reason}</p>
                </Alert>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {(data.isVkAccount || data.isGoogleAccount) &&
              data.avatar.toString().substring(0, 4) == "http" ? (
                <div
                  className="avatar_profile_modal"
                  style={{
                    backgroundImage: `url(${data.avatar})`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar_profile_modal"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + "avatars/" + data.avatar
                    })`,
                  }}
                ></div>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <b>{data.firstName + " " + data.secondName}</b>
            </Col>
          </Row>
          <Row className="mt-4">
            <Tabs
              defaultActiveKey="data"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="data" title="Основное">
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Идентификатор"
                  >
                    <Form.Control type="text" disabled value={data.id} />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Электронный адрес почты"
                  >
                    <Form.Control type="text" disabled value={data.email} />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Номер телефона"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      value={data.numberPhone}
                    />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Дата рождения"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      value={data.dateBirthday}
                    />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Дата регистрации"
                  >
                    <Form.Control type="text" disabled value={data.createdAt} />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Роль"
                  >
                    <Form.Control type="text" disabled value={data.role} />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Аватар"
                  >
                    <Form.Control type="text" disabled value={data.avatar} />
                  </FloatingLabel>
                </Row>
                <Row className="mt-2">
                  <FloatingLabel
                    className="modal_user_label"
                    controlId="floatingInputGrid"
                    label="Тип регистрации"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      value={
                        !data.isGoogleAccount
                          ? !data.isVkAccount
                            ? "Веб-сервис"
                            : "Vkontakte"
                          : "Google"
                      }
                    />
                  </FloatingLabel>
                </Row>
              </Tab>
              <Tab eventKey="order" title="Заказы">
                <Row>
                  {orders.length == 0 ? (
                    <Row>
                      <b>Заказы отсутствуют...</b>
                    </Row>
                  ) : (
                    orders.length !== 0 &&
                    orders?.map((order) => (
                      <Col xs={6} className="mt-2">
                        <Card className="user_data_card_admin">
                          <Card.Body>
                            <Row className="d-flex flex-column justify-content-between align-items-center">
                              <Col>
                                <b>Идентификатор заказа: </b>
                                {order.id}
                              </Col>
                              <Col>
                                <b>Дата: </b>
                                {order.createdAt}
                              </Col>
                              <Col>
                                <b>Статус: </b>
                                {order.isComplete ? "Доставлен" : "В пути"}
                              </Col>
                              <Col>
                                <Button
                                  onClick={() => viewDetailOrder(order.id)}
                                  className="mt-2"
                                  variant="outline-info"
                                >
                                  Подробнее
                                </Button>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>
              </Tab>
              <Tab eventKey="settings" title="Управление">
                <Row className="m-2">
                  <Button
                    onClick={() => setShowChangeRoleModal(true)}
                    variant="outline-success"
                  >
                    Назначить роль
                  </Button>
                </Row>
                <Row className="m-2">
                  {data.bannedUser.length !== 0 ? (
                    <Button
                      variant="outline-success"
                      onClick={() => setShowUnbannedUserModal(true)}
                    >
                      Разблокировать аккаунт
                    </Button>
                  ) : (
                    <Button
                      variant="outline-warning"
                      onClick={() => setShowBannedUserModal(true)}
                    >
                      Заблокировать аккаунт
                    </Button>
                  )}
                </Row>
                <Row className="m-2">
                  <Button variant="outline-danger" disabled>
                    Удалить аккаунт
                  </Button>
                </Row>
                <Row className="m-2">
                  <Button variant="outline-info" disabled>
                    Написать сообщение
                  </Button>
                </Row>
              </Tab>
            </Tabs>
          </Row>
        </Modal.Body>
      </Modal>

      <Suspense>
        {showDetailModal ? (
          <DetailOrdersForAdmin
            show={showDetailModal}
            handleClose={handleCloseDetailModal}
            productInfo={chooseOrderDetail}
            id={chooseOrderDetailId}
          />
        ) : (
          ""
        )}
      </Suspense>

      <Suspense>
        {showChangeRoleModal ? (
          <ChangeRole
            show={showChangeRoleModal}
            handleClose={handleCloseChangeRoleUserModal}
            firstName={data.firstName}
            secondName={data.secondName}
            userId={data.id}
            role={data.role}
            reRender={reRender}
          />
        ) : (
          ""
        )}
      </Suspense>

      <Suspense>
        {showBannedUserModal ? (
          <BannedUser
            show={showBannedUserModal}
            handleClose={handleShowBannedUserModal}
            email={data.email}
            userId={data.id}
            reRender={reRender}
          />
        ) : (
          ""
        )}
      </Suspense>

      <Suspense>
        {showUnbannedUserModal ? (
          <UnbannedUser
            show={showUnbannedUserModal}
            handleClose={handleShowUnbannedUserModal}
            reason={data.bannedUser[0].reason}
            bannedDate={data.bannedUser[0].createdAt}
            reRender={reRender}
            email={data.email}
            userId={data.id}
          />
        ) : (
          ""
        )}
      </Suspense>
    </>
  );
}
