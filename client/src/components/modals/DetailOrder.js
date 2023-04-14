import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";

const DetailsOrder = ({ show, handleClose, detail }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация о заказе №{detail?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex flex-column">
            <Row className="ml-1">
              <h4 className="p-0 m-0">Основная информация о заказе</h4>
            </Row>
            <Row>
              <Col className="mt-1 mb-1 pl-4">
                <p className="p-0 m-0">
                  Общая сумма заказа: {detail?.totalPrice} рублей
                </p>
                <p className="p-0 m-0">
                  Доставка:{" "}
                  {!detail?.paymentDelivery ? "Бесплатная" : "Платная"}
                </p>
                <p className="p-0 m-0">
                  Скидка: {detail?.sale == 100 ? 0 : detail?.sale * 100}%
                </p>
              </Col>
            </Row>
            <hr />

            <Row className="ml-1">
              <h4 className="p-0 m-0">Информация о заказчике</h4>
            </Row>
            <Row>
              <Col className="mt-1 mb-1 pl-4">
                <p className="p-0 m-0">Имя: {detail?.firstName}</p>
                <p className="p-0 m-0">Фамилия: {detail?.secondName}</p>
                <p className="p-0 m-0">Номер телефона: {detail?.numberPhone}</p>
                <p className="p-0 m-0">Страна: {detail?.country}</p>
                <p className="p-0 m-0">Город: {detail?.city}</p>
                <p className="p-0 m-0">Улица: {detail?.street}</p>
                <p className="p-0 m-0">Номер дома: {detail?.numberHome}</p>
                <p className="p-0 m-0">
                  Номер квартиры:{" "}
                  {detail?.numberApartment == null
                    ? "-"
                    : detail?.numberApartment}
                </p>
                <p className="p-0 m-0">Почтовый индекс: {detail?.zipCode}</p>
              </Col>
            </Row>
          </Row>
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
export default DetailsOrder;
