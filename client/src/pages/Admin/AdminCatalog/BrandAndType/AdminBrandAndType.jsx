import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Button,
  Accordion,
  Table,
  FormControl,
  Card,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { FaFeather } from "react-icons/fa";
import BrandItemAdmin from "../../../../components/AdminItems/BrandItemAdmin";
import CreateBrand from "../../../../components/modals/CreateBrand";
import { fetchBrands } from "../../../../http/productAPI";
import "./AdminBrandAndType.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import ListType from "../../../../templates/Admin/AdminType/ListType/ListType";

const AdminBrandAndType = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [brandVisible, setBrandVisible] = useState(false);
  const [brands, setBrands] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [searchBrand, setSearchBrand] = useState("");


  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });
  }, []);

  //re-render
  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };


  const filterBrands = brands.rows?.filter((brand) => {
    if (searchBrand) {
      return brand.name.toLowerCase().includes(searchBrand.toLowerCase());
    }
    return brand.name;
  });

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
          <Col xs={6}>
            <Row>
              <Col>
                <Card
                  border="success"
                  style={{ marginLeft: 0, marginBottom: 10, boxShadow: "none" }}
                >
                  <Card.Body>
                    <Row>
                      <Col
                        xs={2}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <FaFeather size={40} />
                      </Col>
                      <Col
                        xs={10}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ fontSize: 21, textAlign: "center" }}>
                          Количество брендов: {brands.count}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant={"outline-success"}
                  className="w-100"
                  onClick={() => setBrandVisible(true)}
                >
                  <AiOutlinePlus />
                  Добавить бренд
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Accordion>
                  <Accordion.Item eventKey="" className="mt-4 mb-4">
                    <Accordion.Header>Список брендов</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <FormControl
                          type="search"
                          placeholder="Поиск бренда по названию"
                          className="me-2"
                          aria-label="Search"
                          onChange={(e) => setSearchBrand(e.target.value)}
                        />
                      </Row>
                      <Row>
                        <Table striped bordered hover className="mt-4 p-2">
                          <thead>
                            <tr>
                              <th>ID бренда</th>
                              <th>Название</th>
                              <th>Редактировать</th>
                              <th>Удалить</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterBrands?.map((elem) => {
                              return (
                                <BrandItemAdmin
                                  key={elem.id}
                                  id={elem.id}
                                  name={elem.name}
                                  reRender={reRender}
                                  img_now={elem.img}
                                />
                              );
                            })}
                          </tbody>
                        </Table>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <CreateBrand
        reRender={reRender}
        show={brandVisible}
        onHide={() => setBrandVisible(false)}
      />
    </>
  );
};

export default AdminBrandAndType;
