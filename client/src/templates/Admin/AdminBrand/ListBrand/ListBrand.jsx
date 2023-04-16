import React, { useEffect, useState } from "react";
import useRerender from "../../../../hooks/useRerender";
import useModal from "../../../../hooks/useModal";
import { fetchBrands } from "../../../../http/productAPI";
import {
  Accordion,
  Button,
  Card,
  Col,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { FaFeather } from "react-icons/fa";
import BrandItemAdmin from "../../../../components/AdminItems/BrandItemAdmin";
import CreateBrand from "../../../Modal/AdminBrand/CreateBrandModal/CreateBrandModal";
import "./ListBrand.scss";

export default function ListBrand() {
  const [brands, setBrands] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");

  const { render, reRender } = useRerender();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });
  }, [render]);

  const filterBrands = brands.rows?.filter((brand) => {
    if (searchBrand) {
      return brand.name.toLowerCase().includes(searchBrand.toLowerCase());
    }
    return brand.name;
  });

  return (
    <>
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
            onClick={() => handleOpenModal()}
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
                  <Table
                    striped
                    bordered
                    hover
                    className="mt-4 p-2 brand-table"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Изменить</th>
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

      <CreateBrand
        reRender={reRender}
        show={showModal}
        onHide={() => handleCloseModal()}
      />
    </>
  );
}
