import React from "react";
import { Badge, Button, Dropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LIKES_ROUTER,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATION_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  QUESTION_ROUTE,
  RULES_ROUTE,
  SHOP_ROUTE,
} from "../../../utils/consts";
import "./Sidebar.scss";

const Sidebar = ({ show, handleClose, isAuth, isAdmin, basket, likes }) => {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    window.location.href = SHOP_ROUTE;
  }

  return (
    <>
      <Offcanvas
        className="offcanvas"
        placement="end"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header className="offcanvas_header">
          <p className="text_logo">
            SHOP<span className="logo_dot">.</span>RU
          </p>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas_body">
          <Link to={SHOP_ROUTE}>
            <Button variant="none" className="off_navigation_btn" type="button">
              Главная
            </Button>
          </Link>
          <Link to={PRODUCT_ROUTE} reloadDocument>
            <Button variant="none" className="off_navigation_btn" type="button">
              Товары
            </Button>
          </Link>
          <Dropdown className="off_navigation_dropdown">
            <Dropdown.Toggle
              variant="none"
              className="off_navigation_dropdown-toggle"
            >
              Прочее
            </Dropdown.Toggle>
            <Dropdown.Menu className="off_navigation_dropdown-menu">
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={ABOUT_ROUTE}
              >
                О нас
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={LOCATIONPLACES_ROUTE}
              >
                Основные адреса
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={RULES_ROUTE}
              >
                Правила
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={QUESTION_ROUTE}
              >
                Вопросы и ответы
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={QUESTION_ROUTE}
              >
                Доставка
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={QUESTION_ROUTE}
              >
                Возврат
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {isAuth && isAdmin == true ? (
            <Link to={ADMIN_ROUTE} reloadDocument>
              <Button
                variant="none"
                className="off_navigation_btn-admin"
                type="button"
              >
                АДМИН-ПАНЕЛЬ
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href="/myprofile"
            >
              Личный кабинет
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={BASKET_ROUTE}
            >
              Корзина{" "}
              <Badge pill bg="success" className="basket_badge">
                {basket.Price} РУБ
              </Badge>{" "}
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={LIKES_ROUTER}
            >
              Лайки{" "}
              <Badge pill bg="success" className="basket_badge">
                {likes._likes.length} ШТ
              </Badge>{" "}
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={ORDERS_ROUTE}
            >
              Заказы{" "}
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={NOTIFICATION_ROUTE}
            >
              Уведомления{" "}
            </Button>
          ) : (
            <div></div>
          )}

          <hr></hr>

          {isAuth ? (
            <Button
              variant="none"
              id="exit"
              className="off_navigation_btn_logout"
              type="button"
              onClick={() => logOut()}
            >
              Выйти
            </Button>
          ) : (
            <Button
              variant="none"
              className="off_navigation_btn_login"
              type="button"
              href={LOGIN_ROUTE}
            >
              Вход / Регистрация
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Sidebar;
