import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchChangeStatusOrder,
  fetchDeleteOrder,
  getOneOrderProducts,
} from "../../http/orderAPI";
import { fetchOneProduct } from "../../http/productAPI";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { jsPDF } from "jspdf";
import { amiriFont } from "../../fonts/amirFont";
import autoTable from "jspdf-autotable";

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

  const getPDFDocument = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");
    doc.setFontSize(16);
    doc.text(`Заказ №${id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Информация о заказчике:`, 10, 20);
    doc.setFontSize(9);
    doc.text(`Имя: ${productInfo.detail?.firstName}`, 10, 30);
    doc.text(`Фамилия: ${productInfo.detail?.secondName}`, 10, 35);
    doc.text(`Номер телефона: ${productInfo.detail?.numberPhone}`, 10, 40);
    doc.text(`Страна: ${productInfo.detail?.country}`, 10, 45);
    doc.text(`Город: ${productInfo.detail?.city}`, 10, 50);
    doc.text(`Улица: ${productInfo.detail?.street}`, 10, 55);
    doc.text(`Номер дома: ${productInfo.detail?.numberHome}`, 10, 60);
    doc.text(
      `Номер квартиры: ${
        productInfo.detail?.numberApartment == null
          ? "-"
          : productInfo.detail?.numberApartment
      }`,
      10,
      65
    );
    doc.text(`Почтовый индекс: ${productInfo.detail?.zipCode}`, 10, 70);
    doc.setFontSize(12);
    doc.text(`Информация о заказе:`, 100, 20);
    doc.setFontSize(9);
    doc.text(
      `Итоговая стоимость: ${productInfo.detail?.totalPrice} рублей`,
      100,
      30
    );
    doc.text(
      `Скидка: ${
        productInfo.detail?.sale == 100 ? 0 : productInfo.detail?.sale*100
      }%`,
      100,
      35
    );
    doc.text(
      `Доставка: ${
        !productInfo.detail?.paymentDelivery ? "Бесплатная" : "Платная"
      }`,
      100,
      40
    );

    doc.setFontSize(12);
    doc.text(`Перечень товаров:`, 10, 90);
    doc.setFontSize(9);

    autoTable(doc, {
      startY: 95,
      styles: {
        font: "Amiri",
        fontStyle: "normal",
      },
      head: [["Наименование", "Размер", "Количество", "Цена"]],
      body: productInfo.products?.map((item) => {
        return [item.description.name, item.size, item.count, item.description.price];
      }),
    });

    doc.save(`Order #${id}`);
  };

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

      <Modal
        show={modalInfo}
        onHide={handleCloseInfo}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Информационное окно
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Информация о заказе (Номер заказа: {id})
          <hr />
          <Row className="ml-1">
            <Col>
              <Row>
                Общая сумма заказа: {productInfo.detail?.totalPrice} рублей
              </Row>
              <Row>
                Доставка:{" "}
                {!productInfo.detail?.paymentDelivery
                  ? "Бесплатная"
                  : "Платная"}
              </Row>
              <Row>
                Скидка:{" "}
                {productInfo.detail?.sale == 100 ? 0 : productInfo.detail?.sale*100}
                %
              </Row>
              <Row></Row>
              <Row></Row>
            </Col>
          </Row>
          <hr />
          <Row className="ml-1">
            <Col>
              <Row>Имя: {productInfo.detail?.firstName}</Row>
              <Row>Фамилия: {productInfo.detail?.secondName}</Row>
              <Row>Номер телефона: {productInfo.detail?.numberPhone}</Row>
              <Row>Страна: {productInfo.detail?.country}</Row>
              <Row>Город: {productInfo.detail?.city}</Row>
              <Row>Улица: {productInfo.detail?.street}</Row>
              <Row>Номер дома: {productInfo.detail?.numberHome}</Row>
              <Row>
                Номер квартиры:{" "}
                {productInfo.detail?.numberApartment == null
                  ? "-"
                  : productInfo.detail?.numberApartment}
              </Row>
              <Row>Почтовый индекс: {productInfo.detail?.zipCode}</Row>
            </Col>
          </Row>
          <hr />
          {productInfo.prod?.map((item) => {
            return (
              <Card className="mt-2" style={{ boxShadow: "none" }}>
                <Row>
                  <Col md={2}>
                    <img
                      style={{ width: "100%" }}
                      src={process.env.REACT_APP_API_URL + 'products/' + item.description.imgMain}
                      alt=""
                    />
                  </Col>
                  <Col className="d-flex align-items-center">
                    <ul style={{ listStyle: "none" }}>
                      <li>Код товара: {item.description.id}</li>
                      <li>
                        Имя товара:{" "}
                        <Link to={PRODUCT_ROUTE + "/" + item.description.id}>
                          {" "}
                          {item.description.name}{" "}
                        </Link>
                      </li>
                      <li>Цена товара: {item.description.price} РУБ</li>
                      <li>Количество: {item.count}</li>
                      <li>Размер: {item.size}</li>
                    </ul>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center"></Col>
                </Row>
              </Card>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => getPDFDocument()}>
            Импортировать в .pdf
          </Button>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OrderItemAdmin;
