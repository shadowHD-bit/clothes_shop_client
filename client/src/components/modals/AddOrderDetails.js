import React, { useContext, useState } from "react";
import { Alert, Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Context } from "../..";
import { sendOrder, toPayment } from "../../http/orderAPI";
import { CHECKOUT_ROUTE } from "../../utils/consts";
import "./modal.scss";

const AddOrderDetails = ({
  show,
  onHide,
  sale,
  payment_delivery,
  total_price,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let now = new Date();

    // const formData = new FormData();
    // formData.append("amount", total_price);
    // formData.append("description", `Заказ пользователя ${data.firstName} ${data.secondName} от ${now.toDateString()}`);
    toPayment({amount: total_price, description: `Заказ пользователя ${data.firstName} ${data.secondName} от ${now.toDateString()}`}).then(data_payment => {
      if(data_payment){
        localStorage.setItem(
          "user_details",
          JSON.stringify({
            sale: sale == 1 ? 0 : (1 - sale).toFixed(2),
            paymentDelivery: payment_delivery,
            totalPrice: total_price,
            firstName: data.firstName,
            secondName: data.secondName,
            numberPhone: data.numberPhone,
            country: "Россия",
            city: data.city,
            street: data.street,
            numberHome: data.numberHome,
            numberApartment: data.numberApartment,
            zipCode: data.zipCode,
          })
        );

        window.location.href = data_payment.confirmation.confirmation_url
      }
    })

  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Данные доставки
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <p>
              Пожалуйста, укажите следующие данные для того, чтобы мы доставить
              посылку по верному адресу!
            </p>
          </Alert>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Label>Имя:</Form.Label>
                <Form.Control {...register("firstName", { required: true })} />
                {errors.firstName && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите имя!
                    </p>
                  </div>
                )}
                <Form.Label>Фамилия:</Form.Label>
                <Form.Control {...register("secondName", { required: true })} />
                {errors.secondName && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите фамилию!
                    </p>
                  </div>
                )}{" "}
              </Col>
              <Col>
                {" "}
                <Form.Label>Номер телефона:</Form.Label>
                <Form.Control
                  {...register("numberPhone", { required: true })}
                />
                {errors.numberPhone && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите номер телефона!
                    </p>
                  </div>
                )}{" "}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Label>Страна:</Form.Label>
                <Form.Control
                  disabled
                  defaultValue="Россия"
                  {...register("country")}
                />
                <Form.Label>Город:</Form.Label>
                <Form.Control {...register("city", { required: true })} />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите город!
                    </p>
                  </div>
                )}{" "}
                <Form.Label>Улица:</Form.Label>
                <Form.Control {...register("street", { required: true })} />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите улицу!
                    </p>
                  </div>
                )}{" "}
              </Col>
              <Col>
                <Form.Label>Номер дома:</Form.Label>
                <Form.Control {...register("numberHome", { required: true })} />
                {errors.numberHome && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите номер дома!
                    </p>
                  </div>
                )}{" "}
                <Form.Label>Номер квартиры:</Form.Label>
                <Form.Control {...register("numberApartment")} />
                <Form.Label>Почтовый индекс:</Form.Label>
                <Form.Control {...register("zipCode", { required: true })} />
                {errors.zipCode && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите почтовый индекс!
                    </p>
                  </div>
                )}{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="mt-3" variant="success" type="submit">
                  Оплатить
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddOrderDetails;
