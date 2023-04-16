import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createRules } from "../../../../http/rulesAPI";
import { useForm } from "react-hook-form";
import "./CreateCouponModal.scss";
import { createCoupon } from "../../../../http/couponAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";

const CreateCoupon = ({ show, reRender, onHide }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("discount", data.discount);
    createCoupon(formData).then(() => {
      onHide();
      reRender();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <ModalTitle firstText={"Добавить"} secondText={"купон"} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Label className="added-label">Введите код купона:</Form.Label>
          <Form.Control type="text" {...register("code", { required: true })} />
          {errors.code && (
            <div className="alert_error_container">
              <p className="error_alert" role="error_alert">
                Укажите код купона!
              </p>
            </div>
          )}
          <Form.Label className="added-label mt-3">
            Введите процент скидки:
          </Form.Label>
          <Form.Control
            type="number"
            {...register("discount", { required: true })}
          />
          {errors.discount && (
            <div className="alert_error_container">
              <p className="error_alert" role="error_alert">
                Укажите процент скидки!
              </p>
            </div>
          )}
          <Button variant="outline-success mt-3" type="submit">
            Добавить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCoupon;
