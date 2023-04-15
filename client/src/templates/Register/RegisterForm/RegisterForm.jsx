import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Formik } from "formik";
import { BsBootstrapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Col, FloatingLabel, Row } from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../../utils/consts";
import { Context } from "../../..";
import { registration } from "../../../http/userAPI";

import "./RegisterForm.scss";
import AuthGoogleButton from "../../../components/AuthGoogleButton/AuthGoogleButton";
import AuthVkButton from "../../../components/AuthVkButton/AuthVkButton";

export default function RegisterForm() {
  const { user } = useContext(Context);

  const schema = yup.object().shape({
    name: yup.string().required("Пожалуйста, укажите имя!"),
    lastName: yup.string().required("Пожалуйста, укажите фамилию!"),
    date: yup.string().required("Пожалуйста, укажите дату рождения!"),
    gender: yup.string().required("Пожалуйста, укажите пол!"),
    email: yup
      .string()
      .required("Пожалуйста, укажите почту!")
      .email("Укажите корректный адрес эл. почты!"),
    password: yup
      .string()
      .required("Пожалуйста, укажите пароль!")
      .min(5, "Пароль слишком короткий!")
      .max(30, "Пароль слишком длинный!"),
    phone: yup.string().required("Пожалуйста, укажите номер телефона!"),
    allowSpam: yup.bool(),
    confidential: yup.bool().required().oneOf([true], "Подтвердите согласие!"),
  });

  return (
    <>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={5}
        xl={5}
        xxl={5}
        className="reg_card_right flex-column pr-5 pl-5"
      >
        <Formik
          validationSchema={schema}
          enableReinitialize={true}
          validateOnBlur={false}
          onSubmit={(values) => {
            if (
              values.email != "" &&
              values.password != "" &&
              values.name != "" &&
              values.lastName != "" &&
              values.date != "" &&
              values.phone != ""
            ) {
              try {
                let data;
                data = registration(
                  values.email,
                  values.password,
                  values.name,
                  values.lastName,
                  values.date,
                  values.phone,
                  values.gender,
                  values.allowSpam
                ).then(() => {
                  user.setUser(user);
                  user.setIsAuth(true);
                  window.location.href = SHOP_ROUTE;
                });
              } catch (e) {
                alert(e.response.data.message);
              }
            }
          }}
          initialValues={{
            email: "",
            password: "",
            name: "",
            lastName: "",
            date: "",
            gender: true,
            phone: "",
            allowSpam: false,
            confidential: false,
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <p className="title">
                    Регистрация в{" "}
                    <span className="name_shop">
                      SHOP
                      <span className="dot_shop">.</span>
                      RU
                    </span>
                  </p>
                </Col>
              </Row>
              <Row className="d-flex flex-row justify-center w-100 mb-3">
                <Col xs={12} md={12}>
                  <AuthGoogleButton />
                </Col>
                <Col>
                  <AuthVkButton />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="sub_text">
                    Введите все указанные данные для того, чтобы
                    зарегистрироваться на сайте :)
                  </p>
                </Col>
              </Row>
              <Row>
                <p className="title_form">Личная информация</p>
              </Row>
              <Row>
                <FloatingLabel controlId="floatingInputq" label="Имя">
                  <Form.Control
                    type="text"
                    className="reg_card_input"
                    placeholder="Иван"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputw" label="Фамилия">
                  <Form.Control
                    type="text"
                    name="lastName"
                    className="reg_card_input"
                    placeholder="Иванов"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInpute" label="Дата рождения">
                  <Form.Control
                    type="date"
                    name="date"
                    className="reg_card_input"
                    placeholder="02.06.1999"
                    value={values.date}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.date}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputr" label="Пол">
                  <Form.Select
                    required
                    name="gender"
                    onChange={handleChange}
                    aria-label="Default select example"
                    isValid={touched.gender && !errors.gender}
                    isInvalid={!!errors.gender}
                  >
                    <option value={true}>Мужской</option>
                    <option value={false}>Женский</option>
                  </Form.Select>
                </FloatingLabel>
              </Row>
              <Row>
                {" "}
                <p className="title_form">Данные для входа в аккаунт</p>
              </Row>
              <Row>
                <FloatingLabel controlId="floatingInputt" label="Почта">
                  <Form.Control
                    type="mail"
                    name="email"
                    className="reg_card_input"
                    placeholder="example@mail.ru"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputy" label="Пароль">
                  <Form.Control
                    name="password"
                    type="password"
                    className="reg_card_input"
                    placeholder="*********"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInputu"
                  label="Номер телефона"
                >
                  <Form.Control
                    name="phone"
                    type="tel"
                    className="reg_card_input"
                    placeholder="89999993737"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.phone}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Row>
              <Row className="mt-3">
                <Form.Group>
                  <Form.Check
                    required
                    inline
                    label="* Согласен с политикой конфиденциальности"
                    name="confidential"
                    onChange={handleChange}
                    isValid={touched.confidential && !errors.confidential}
                    isInvalid={!!errors.confidential}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    inline
                    label="Хочу получать рассылку на почту и телефон"
                    name="allowSpam"
                    checked={values.allowSpam}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="d-flex justify-content-center mt-3">
                <Button type="submit" className="register_btn">
                  Зарегистрироваться
                </Button>
              </Row>
              <Row className="d-flex justify-content-center mt-3">
                <Link className="remove_login" to={LOGIN_ROUTE}>
                  Уже есть аккаунт...
                </Link>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
}
