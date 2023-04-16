import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { fetchCoupons } from "../../../../http/couponAPI";

import "./AdminCoupons.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import CouponsItemAdmin from "../../../../components/AdminItems/CouponsItemAdmin";
import CreateCoupon from "../../../../templates/Modal/AdminCoupons/CreateCouponsModal/CreateCouponModal";
import useRerender from "../../../../hooks/useRerender";
import useModal from "../../../../hooks/useModal";

const AdminCoupons = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [coupons, setCoupons] = useState([]);

  const { render, reRender } = useRerender();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    fetchCoupons().then((data) => {
      setCoupons(data.rows);
    });
  }, [render]);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Купоны"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с купонами...
                </Alert.Heading>
                <p>Здесь ты можешь работать с купонами:</p>
                <ul>
                  <li>
                    Если необходимо добавить купон, нажми кнопку "Добавить" и
                    введи необходимые параметры.
                  </li>
                  <li>
                    Если необходимо удалить купон, то выбири купон из списка и
                    нажми на иконку корзины.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-success" onClick={() => handleOpenModal()}>
              Добавить
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          {coupons?.map((item) => (
            <CouponsItemAdmin
              key={item.id}
              code={item.code}
              id={item.id}
              discount={item.discount}
              reRender={reRender}
            />
          ))}
        </Row>
      </Container>

      <CreateCoupon
        show={showModal}
        reRender={reRender}
        onHide={handleCloseModal}
      />
    </>
  );
};
export default AdminCoupons;
