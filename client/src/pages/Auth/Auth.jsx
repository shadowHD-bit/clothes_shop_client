import "./Auth.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { BsBootstrapFill, BsFacebook } from "react-icons/bs";
import {
  FORGOT_PASSWORD_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Link } from "react-router-dom";
import { login, social_Google_auth, social_VK_auth } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import {
  Alert,
  Card,
  Col,
  Container,
  FloatingLabel,
  Row,
  Toast,
} from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import AuthGoogleButton from "../../component/AuthGoogleButton/AuthGoogleButton";
import AuthVkButton from "../../component/AuthVkButton/AuthVkButton";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  window.gapi.load("auth2", function () {
    window.gapi.auth2.init({
      client_id:
        "959674891521-9lrj5b087uh2lb0jr1umc5s17juas9d2.apps.googleusercontent.com",
      plugin_name: "shop.ru",
    });
  });

  // const emailHandler = (e) => {
  //   setEmail(e.target.value);
  //   const re =
  //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   if (!re.test(String(e.target.value).toLowerCase())) {
  //     setErrorMessage("Некоректный адрес электронной почты");
  //   } else {
  //     setErrorMessage("");
  //   }
  // };

  // const passwordHandler = (e) => {
  //   setPassword(e.target.value);
  //   if (e.target.value.length < 3 || e.target.value.length > 15) {
  //     setErrorMessage(
  //       "Пароль не может быть менее 3-х и больше 15-nи символов..."
  //     );

  //     if (!e.target.value) {
  //       setErrorMessage("Пароль не может быть пустым...");
  //     }
  //   } else {
  //     setErrorMessage("");
  //   }
  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [userLoginError, setUserLoginError] = useState(false);
  const [userLoginErrorTest, setUserLoginErrorText] = useState("");

  const onSubmit = async (data_form) => {
    try {
      let data;
      data = await login(data_form.email, data_form.password);
      user.setUser(user);
      user.setIsAuth(true);
      window.location.href = SHOP_ROUTE;
    } catch (e) {
      setUserLoginError(true);
      setUserLoginErrorText(e.response.data.message);
    }
  };

  return (
    <>
      <Container className="auth_container">
        <Row>
          <Col xs={12}>
            <Card className="auth_card">
              <Row
                className="d-flex justify-center w-100"
                style={{ "--bs-gutter-x": 0 }}
              >
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
                          {userLoginErrorTest}
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
                        Введите адрес электронной почты и пароль, чтобы войти в
                        свой аккаунт :)
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
                              // value={email}
                              // onChange={(e) => emailHandler(e)}
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
                              // value={password}
                              // onChange={(e) => passwordHandler(e)}
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
                      <Col
                        xs={12}
                        md={12}
                        className="d-flex justify-content-center pt-3"
                      >
                        <Button className="login_btn" type="submit">
                          Войти
                        </Button>
                      </Col>
                      <Col xs={12} md={12} className="d-lg-none d-md-flex pt-3">
                        <Button className="register_btn">
                          Зарегистрироваться
                        </Button>
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
                        <AuthGoogleButton />
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
                <Col
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="auth_card_right d-none d-lg-flex"
                >
                  <Row className="img_row h-100 w-100">
                    <Col className="img_col h-100 w-100">
                      <p className="register_text">
                        Если ты все еще не зарегистрировался у нас на сайте, то
                        сделай это прямо сейчас!
                      </p>
                      <Link to={REGISTRATION_ROUTE}>
                        <Button className="register_btn">
                          Зарегистрироваться
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Toast
        className="errorToast"
        onClose={() => setShowToast(false)}
        show={showToast}
        autohide
        delay={3000}
        bg="danger"
      >
        <Toast.Header>
          <strong className="me-auto">SHOP.RU</strong>
          <small>Ошибка авторизации!</small>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast> */}
    </>
  );
});

export default Auth;
