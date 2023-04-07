import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchChangeStatusOrder,
  fetchDeleteOrder,
  getOneOrderProducts,
} from "../../http/orderAPI";
import DetailOrdersForAdmin from "../modals/DetailOrdersForAdmin";

const OrderItemAdmin = ({
  id,
  complete,
  createdAt,
  updatedAt,
  userId,
  reRender,
}) => {
  const [modalDelete, setShowDelete] = useState(false);
  const [modalStatus, setShowStatus] = useState(false);

  //modal delete
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const deleteOrder = () => {
    fetchDeleteOrder({ id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //modal status
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => setShowStatus(true);
  const changeStatusOrder = () => {
    fetchChangeStatusOrder({ complete: !complete, id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const [modalInfo, setShowInfo] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  //modal delete
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    getOneOrderProducts(id).then((data) => {
      setProductInfo(data);
    });
  }, []);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{userId}</td>
        <td>
          <Button variant="outline-primary" onClick={() => handleShowInfo()}>
            Информация
          </Button>
        </td>
        <td>{formatDate(createdAt)}</td>
        <td>{complete ? formatDate(updatedAt) : "Заказ не завершен"}</td>
        <td>
          {complete ? (
            <Button variant="outline-success" onClick={handleShowStatus}>
              Доставлен
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={handleShowStatus}>
              В пути
            </Button>
          )}
        </td>
        <td>
          <Button variant="danger" onClick={handleShowDelete}>
            Удалить
          </Button>
        </td>
      </tr>

      {/*modal confirm change status*/}
      <Modal show={modalStatus} onHide={handleCloseStatus}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите действие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы действительно хотите изменить статус товара (Номер товара: {id}),
          из {complete ? "'Завершен'" : "'В пути'"} на{" "}
          {complete ? "'В пути'" : "'Завершен'"}?
          <br />
          <br />
          Данные:
          <ul>
            <li>Дата создания товара: {formatDate(createdAt)}</li>
            {complete ? `Дата завершения: ${formatDate(updatedAt)}` : false}
            <li>Статус: {complete ? "Завершен" : `В пути`}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatus}>
            Закрыть
          </Button>
          <Button variant="success" onClick={changeStatusOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm delete order*/}
      <Modal show={modalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите действие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы хотите удалить данный заказ (Номер заказа: {id})?
          <br />
          <br />
          Данные:
          <ul>
            <li>Дата создания заказа: {formatDate(createdAt)}</li>
            {complete ? `Заказ завершен: ${formatDate(updatedAt)}` : false}
            <li>Статус: {complete ? "Завершен" : `В пути`}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Закрыть
          </Button>
          <Button variant="danger" onClick={deleteOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailOrdersForAdmin show={modalInfo} handleClose={handleCloseInfo} productInfo={productInfo} id={id}/>
    </>
  );
};
export default OrderItemAdmin;
