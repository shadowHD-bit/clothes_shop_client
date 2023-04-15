import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import {
  fetchBadge,
  fetchBrands,
  fetchProduct,
  fetchSizes,
  fetchTypes,
} from "../../http/productAPI";
import { fetchQuestion } from "../../http/questionAPI";
import { fetchSlider } from "../../http/sliderAPI";
import {
  getAllUser,
  getMoneyUserApi,
  getNewUserApi,
  getUserRoleAdminApi,
} from "../../http/userAPI";
import {
  ADMIN_BADGE_ROUTE,
  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  ADMIN_QUESTION_ROUTE,
  ADMIN_SIZE_ROUTE,
  ADMIN_SLIDER_ROUTE,
  ADMIN_USERS_ROUTE,
} from "../../utils/consts";
import "./Admin.scss";
import AdminTitle from "../../components/UI/AdminTitle/AdminTitle";
import AdminInfoCard from "../../components/UI/AdminInfoCard/AdminInfoCard";

const Admin = () => {
  const [countProduct, setCountProduct] = useState(0);
  const [countType, setCountType] = useState(0);
  const [countBrand, setCountBrand] = useState(0);
  const [countQuestion, setCountQuestion] = useState(0);

  const [countSize, setCountSize] = useState(0);
  const [countBadge, setCountBadge] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countSlide, setCountSlide] = useState(0);
  const [adminUser, setAdminUser] = useState([]);
  const [adminUserCount, setAdminUserCount] = useState(0);
  const [newUser, setNewUser] = useState([]);
  const [moneyUser, setMoneyUser] = useState([]);

  useEffect(() => {
    fetchProduct().then((data) => {
      setCountProduct(data.rows.length);
    });
    fetchTypes().then((data) => {
      setCountType(data.count);
    });
    fetchBrands().then((data) => {
      setCountBrand(data.count);
    });
    fetchQuestion({ limit: 1000, page: 1000 }).then((data) => {
      setCountQuestion(data.count);
    });
    fetchSizes().then((data) => {
      setCountSize(data.count);
    });
    fetchBadge().then((data) => {
      setCountBadge(data.count);
    });
    fetchSlider().then((data) => {
      setCountSlide(data.count);
    });
    getUserRoleAdminApi().then((data) => {
      setAdminUser(data.rows);
      setAdminUserCount(data.count);
    });
    getNewUserApi().then((data) => {
      setNewUser(data);
    });
    getMoneyUserApi().then((data) => {
      setMoneyUser(data);
    });
    getAllUser().then((data) => {
      setCountUser(data.count);
    });
  }, []);

  const [resultMoneyUser, setResultMoneyUser] = useState([]);

  useEffect(() => {
    let resultArray = [];
    moneyUser.map((item) => {
      if (resultArray.find((obj) => obj.user_id == item.user.id) != undefined) {
        resultArray.map((res) => {
          item.order_products.map((res_o) => {
            if (res.user_id == item.user.id) {
              return (res.totalPrice =
                Number(res.totalPrice) + Number(res_o.totalPrice));
            } else {
              return res;
            }
          });
        });
      } else {
        let total;
        if (item.order_products.length == 1) {
          total = item.order_products[0].totalPrice;
        } else {
          total = item.order_products.reduce(
            (a, c) => (a += Number(c.totalPrice)),
            0
          );
        }
        resultArray.push({
          user_id: item.user.id,
          user_name: item.user.firstName,
          user_family: item.user.secondName,
          user_img: item.user.avatar,
          isVK: item.user.isVkAccount,
          isGoogle: item.user.isGoogleAccount,
          totalPrice: total,
        });
      }
    });
    setResultMoneyUser(resultArray);
  }, [moneyUser]);

  console.log(moneyUser);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Главная"'} />

        <Row>
          <AdminInfoCard
            count={countProduct}
            title={"Количество товаров"}
            route={ADMIN_PRODUCT_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countType}
            title={"Количество типов"}
            route={ADMIN_BRANDANDTYPE_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countBrand}
            title={"Количество брендов"}
            route={ADMIN_BRANDANDTYPE_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countQuestion}
            title={"Количество вопросов"}
            route={ADMIN_QUESTION_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countSize}
            title={"Количество размеров"}
            route={ADMIN_SIZE_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countBadge}
            title={"Количество бэйджов"}
            route={ADMIN_BADGE_ROUTE}
            measure={"шт."}
          />

          <AdminInfoCard
            count={countUser}
            title={"Количество пользователей"}
            route={ADMIN_USERS_ROUTE}
            measure={"чел."}
          />

          <AdminInfoCard
            count={adminUserCount}
            title={"Количество администраторов"}
            route={ADMIN_USERS_ROUTE}
            measure={"чел."}
          />

          <AdminInfoCard
            count={countSlide}
            title={"Количество слайдов"}
            route={ADMIN_SLIDER_ROUTE}
            measure={"шт."}
          />
        </Row>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <ListGroup className="admin_list" as="ol" numbered>
              <ListGroup.Item className="admin_list-title">
                Список администраторов
              </ListGroup.Item>
              {adminUser?.map((item) => (
                <ListGroup.Item key={item.id } className="admin_list-item">
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col className="d-flex flex-row align-items-center">
                      {(item.isVkAccount || item.isGoogleAccount) &&
                      item.avatar.toString().substring(0, 4) == "http" ? (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${item.avatar})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${
                              process.env.REACT_APP_API_URL +
                              "avatars/" +
                              item.avatar
                            })`,
                          }}
                        ></div>
                      )}{" "}
                      {item.firstName} {item.secondName}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered className="admin_list">
              <ListGroup.Item className="admin_list-title">
                Список новых пользователей
              </ListGroup.Item>
              {newUser?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col className="d-flex flex-row align-items-center">
                      {(item.isVkAccount || item.isGoogleAccount) &&
                      item.avatar.toString().substring(0, 4) == "http" ? (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${item.avatar})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${
                              process.env.REACT_APP_API_URL +
                              "avatars/" +
                              item.avatar
                            })`,
                          }}
                        ></div>
                      )}{" "}
                      {item.firstName} {item.secondName}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered className="admin_list">
              <ListGroup.Item className="admin_list-title">
                Список пользователей по покупкам
              </ListGroup.Item>
              {resultMoneyUser
                ?.sort((a, b) => {
                  return b.totalPrice - a.totalPrice;
                })
                .slice(0, 5)
                .map((item) => (
                  <ListGroup.Item key={item.user_id}>
                    <Row className="d-flex flex-row justify-content-center align-items-center">
                      <Col className="d-flex flex-row align-items-center">
                        {(item.isVK || item.isGoogle) &&
                        item.user_img.toString().substring(0, 4) == "http" ? (
                          <div
                            className="avatar_profile"
                            style={{
                              backgroundImage: `url(${item.user_img})`,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="avatar_profile"
                            style={{
                              backgroundImage: `url(${
                                process.env.REACT_APP_API_URL +
                                "avatars/" +
                                item.user_img
                              })`,
                            }}
                          ></div>
                        )}{" "}
                        {item.user_name} {item.user_family}
                      </Col>

                      <Col
                        xs={4}
                        className="d-flex flex-row justify-content-end"
                      >
                        {item.totalPrice} РУБ
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
