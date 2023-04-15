import React, { useContext, useEffect, useState } from "react";
import { getHistoryView } from "../../http/historyAPI";
import { Context } from "../..";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IoMdShirt } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { MdLabel } from "react-icons/md";

export default function HistoryProduct() {
  const [history, setHistory] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    if (user.isAuth && user.user.id != undefined) {
      getHistoryView(user.user.id).then((data) => {
        setHistory(data);
      });
    }
  }, []);

  return (
    <>
      <Container fluid className="popular_product">
        <Container fluid="md">
          <Row>
            <p className="popular_title">
              <span className="red">Недавно </span> просматривали
            </p>
          </Row>
          <Row>
            {history?.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="popular_product_card"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL +
                      "products/" +
                      item.product.imgMain
                    })`,
                  }}
                >
                  <Card.Body className="popular_product_card-body">
                    <Row className="p-0 m-0 product-param">
                      <Row className="p-0 m-0 product-brand">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.product.brand.name}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <BsFillPeopleFill size={20} />
                        </Col>
                      </Row>
                      <Row className="p-0 m-0 product-type">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.product.type.name}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <IoMdShirt size={20} />
                        </Col>
                      </Row>
                      <Row className="p-0 m-0 product-type">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.product.badge.name}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <MdLabel size={20} />
                        </Col>
                      </Row>
                    </Row>
                    <Row className="p-0 m-0 product-name">
                      <p>
                        <Link to={PRODUCT_ROUTE + "/" + item.product.id}>
                          {item.product.name}
                        </Link>
                      </p>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
