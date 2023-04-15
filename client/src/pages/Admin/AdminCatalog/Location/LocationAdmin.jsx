import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import LocationItemAdmin from "../../../../components/AdminItems/LocationItemAdmin";
import CreateLocation from "../../../../components/modals/CreateLocation";
import { fetchLocations } from "../../../../http/locationAPI";
import "./LocationAdmin.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const LocationAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [stateModalCreate, setStateModalCreate] = useState(false);

  const [location, setLocation] = useState([]);

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocation(data.rows);
    });
  }, []);

  const handleShowLocation = () => {
    setStateModalCreate(true);
  };

  const handleCloseLocation = () => {
    setStateModalCreate(false);
  };

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocation(data.rows);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Основные места"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с основными местами
                  компании...
                </Alert.Heading>
                <p>Здесь ты можешь:</p>
                <ul>
                  <li>Удалять созданные позиции;</li>
                  <li>Редактировать уже созданные позицииж</li>
                  <li>Добавлять позиции основных мест.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item
                eventKey=""
                className="mt-4 mb-4"
                onClick={() => setStateAccordion(true)}
              >
                <Accordion.Header>Список позиций</Accordion.Header>
                <Accordion.Body>
                  <Button
                    variant="success"
                    onClick={() => handleShowLocation()}
                  >
                    Добавить
                  </Button>
                  <Table striped bordered hover className="mt-4 p-2">
                    <thead>
                      <tr>
                        <th>ID позиции</th>
                        <th>Наименование</th>
                        <th>Тестовый адрес</th>
                        <th>Координаты</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                      </tr>
                    </thead>
                    <tbody>
                      {location?.map((item) => {
                        return (
                          <LocationItemAdmin reRender={reRender} item={item} />
                        );
                      })}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <CreateLocation
        reRender={reRender}
        show={stateModalCreate}
        onHide={handleCloseLocation}
      />
    </>
  );
};
export default LocationAdmin;
