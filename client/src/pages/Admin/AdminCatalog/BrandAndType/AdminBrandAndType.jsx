import React from "react";
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import "./AdminBrandAndType.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import ListType from "../../../../templates/Admin/AdminType/ListType/ListType";
import ListBrand from "../../../../templates/Admin/AdminBrand/ListBrand/ListBrand";

const AdminBrandAndType = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Бренды и типы"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с типами и брендами
                  товаров...
                </Alert.Heading>
                <p>Здесь ты можешь настроить типы и бренды товара:</p>
                <ul>
                  <li>
                    Чтобы создать бренд или тип товара, нажми на кнопку "Создать
                    бренд/тип".
                  </li>
                  <li>
                    Чтобы удалить бренд/тип, выбери позицию в соответствующей
                    таблице и нажмите кнопку "Удалить", подтвердив действие.
                  </li>
                  <li>
                    Чтобы отредактировать тип/бренд, выбери позицию в
                    соответствующей таблице и нажмите кнопку "Редактировать",
                    подтвердив действие
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ListType />
          </Col>
          <Col xs={12} md={6}>
            <ListBrand />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminBrandAndType;
