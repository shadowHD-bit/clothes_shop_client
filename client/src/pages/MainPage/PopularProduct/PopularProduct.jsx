import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./PopularProduct.scss";
import { fetchPopularProduct } from "../../../http/productAPI";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../../utils/consts";
import { AiOutlineStar } from "react-icons/ai";
import { IoMdShirt } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";

const PopularProduct = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchPopularProduct().then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <>
      <Container fluid className="popular_product">
        <Container fluid="md">
          <Row>
            <p className="popular_title">
              <span className="red">Популярные </span> товары
            </p>
          </Row>
          <Row>
            {product?.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="popular_product_card"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + "products/" + item.imgMain
                    })`,
                  }}
                >
                  <Card.Body className="popular_product_card-body">
                    <Row className="p-0 m-0 product-param">
                      <Row className="p-0 m-0 product-brand">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.brand.name}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <BsFillPeopleFill size={20} />
                        </Col>
                      </Row>
                      <Row className="p-0 m-0 product-type">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.type.name}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <IoMdShirt size={20} />
                        </Col>
                      </Row>
                      <Row className="p-0 m-0 product-rating">
                        <Col xs={"auto"} className="p-0 m-0 text">
                          <p className="p-0 m-0">{item.all_rate}</p>
                        </Col>
                        <Col xs={"auto"} className="p-0 m-0">
                          <AiOutlineStar size={20} />
                        </Col>
                      </Row>
                    </Row>
                    <Row className="p-0 m-0 product-name">
                      <p>
                        <Link to={PRODUCT_ROUTE + "/" + item.id}>
                          {item.name}
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
};

export default PopularProduct;
