import React, { useContext, useState } from "react";
import { Alert, Button, Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE, SHOP_ROUTE } from "../../../utils/consts";
import { emailPattern } from "../../../utils/patterns";
import { login } from "../../../http/userAPI";
import { Context } from "../../..";
import { useForm } from "react-hook-form";
import { initGoogleAuth } from "../../../utils/configs/googleAuthConfig";

import AuthGoogleButton from "../../../components/AuthGoogleButton/AuthGoogleButton";
import AuthVkButton from "../../../components/AuthVkButton/AuthVkButton";
import "./AuthForm.scss";

export default function AuthForm() {
  const { user } = useContext(Context);
  const [userLoginError, setUserLoginError] = useState(false);
  const [userLoginErrorText, setUserLoginErrorText] = useState("");

  //Google Auth Api Init
  initGoogleAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data_form) => {
    await login(data_form.email, data_form.password)
      .then(() => {
        user.setUser(user);
        user.setIsAuth(true);
        window.location.href = SHOP_ROUTE;
      })
      .catch((e) => {
        setUserLoginError(true);
        setUserLoginErrorText(e.response.data.message);
      });
  };

  return (
    <>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        xxl={6}
        className="auth_card_left"
      >
        <Row className="d-flex flex-row justify-content-center align-items-center w-100">
          <Col xs={8}>
            {userLoginError ? (
              <Alert variant="danger" className="alert_login_error">
                {userLoginErrorText}
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="d-flex justify-center w-100">
            <p className="title_auth">
              Добро пожаловать в{" "}
              <span className="name_shop">
                SHOP
                <span className="dot_shop">.</span>
                RU
              </span>
            </p>
          </Row>
          <Row className="d-flex justify-center w-100">
            <p className="sub_text">
              Введите адрес электронной почты и пароль, чтобы войти в свой
              аккаунт :)
            </p>
          </Row>
          <Row className="auth_form_row">
            <Col xs={12} className="w-100">
              <Row className="mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  className="label_form"
                  label="Электронная почта"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="auth_card_input"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: true,
                      pattern: emailPattern,
                    })}
                  />
                </FloatingLabel>
                {errors.email?.type === "required" && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите адрес эл. почты!
                    </p>
                  </div>
                )}
                {errors.email?.type === "pattern" && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите корректный адрес эл. почты!
                    </p>
                  </div>
                )}
              </Row>
              <Row className="mb-3">
                <FloatingLabel
                  controlId="floatingPassword"
                  className="label_form"
                  label="Пароль"
                >
                  <Form.Control
                    className="auth_card_input"
                    type="password"
                    placeholder="*******"
                    {...register("password", { required: true })}
                  />
                </FloatingLabel>
                {errors.password?.type === "required" && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите пароль!
                    </p>
                  </div>
                )}
              </Row>
            </Col>
          </Row>
          <Row className="d-flex flex-column justify-center w-100">
            <Col xs={12} md={12} className="d-flex justify-content-center pt-3">
              <Button className="login_btn" type="submit">
                Войти
              </Button>
            </Col>
            <Col xs={12} md={12} className="d-lg-none d-md-flex pt-3">
              <Button className="register_btn">Зарегистрироваться</Button>
            </Col>
          </Row>
          <Row className="d-flex flex-column justify-center w-100">
            <Col>
              <hr />
            </Col>
          </Row>
          <Row className="d-flex flex-column justify-center w-100">
            <Col>
              <p className="sub_text">
                Или авторизуйтесь с помощью социальных сетей...
              </p>
            </Col>
          </Row>
          <Row className="d-flex flex-row justify-center w-100">
            <Col xs={12} md={12}>
              <AuthGoogleButton
                isError={setUserLoginError}
                errorText={setUserLoginErrorText}
              />
            </Col>
            <Col>
              <AuthVkButton />
            </Col>
          </Row>
          <Row className="d-flex justify-center w-100 pt-3">
            <Col className="d-flex justify-content-center mt-3">
              <Link to={FORGOT_PASSWORD_ROUTE}>
                <p>Забыли пароль?</p>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
