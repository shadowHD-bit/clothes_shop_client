import React, { useEffect, useState } from "react";
import { fetchTypes } from "../../../../http/productAPI";
import useRerender from "../../../../hooks/useRerender";
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
import useModal from "../../../../hooks/useModal";
import CreateType from "../../../Modal/CreateTypeModal/CreateTypeModal";
import { FaFeather } from "react-icons/fa";
import TypeItemAdmin from "../../../../components/AdminItems/TypeItemAdmin";

import "./ListType.scss";

export default function ListType() {
  const [types, setTypes] = useState([]);
  const [searchType, setSearchType] = useState("");

  const { render, reRender } = useRerender();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    fetchTypes().then((data) => {
      setTypes(data);
    });
  }, [render]);

  const filterTypes = types.rows?.filter((type) => {
    if (searchType) {
      return type.name.toLowerCase().includes(searchType.toLowerCase());
    }
    return type.name;
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
                    Количество типов: {types.count}
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
            Добавить тип
          </Button>
        </Col>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="" className="mt-4 mb-4">
            <Accordion.Header>Список типов</Accordion.Header>
            <Accordion.Body>
              <Row>
                <FormControl
                  type="search"
                  placeholder="Поиск типа по названию"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchType(e.target.value)}
                />
              </Row>
              <Row>
                <Table striped bordered hover className="mt-4 p-2 type-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Название</th>
                      <th>Изменить</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTypes?.map((elem) => {
                      return (
                        <TypeItemAdmin
                          key={elem.id}
                          id={elem.id}
                          img_now={elem.img}
                          name={elem.name}
                          reRender={reRender}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>

      <CreateType
        reRender={reRender}
        show={showModal}
        onHide={() => handleCloseModal()}
      />
    </>
  );
}
