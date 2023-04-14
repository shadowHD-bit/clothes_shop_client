import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { GiPriceTag } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdShirt } from "react-icons/io";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { Context } from "../..";

const LikesItem = ({ product }) => {
  const { likes } = useContext(Context);

  return (
    <>
      <Card className="like-card">
        <Row className="p-0 m-0">
          <Col
            xs={4}
            className="p-0 m-0 img-col"
            style={{
              backgroundImage: `url(${
                process.env.REACT_APP_API_URL + "products/" + product.imgMain
              })`,
            }}
          ></Col>
          <Col xs={8} className="p-1 m-0 product_info">
            <Row>
              <Row>
                <p className="product-name">{product.name}</p>
              </Row>
              <Row className="info-price">
                <Col xs={"auto"}>
                  <GiPriceTag size={20} />
                </Col>
                <Col className="p-0" xs={"auto"}>
                  {product.price} РУБ
                </Col>
              </Row>
              <Row className="info-brand">
                <Col xs={"auto"}>
                  <BsFillPeopleFill size={20} />
                </Col>
                <Col className="p-0" xs={"auto"}>
                  {product.brand.name}
                </Col>
              </Row>
              <Row className="info-type">
                <Col xs={"auto"}>
                  <IoMdShirt size={20} />
                </Col>
                <Col className="p-0" xs={"auto"}>
                  {product.type.name}
                </Col>
              </Row>
            </Row>
            <Row className="info-btn">
              <Col>
                <Row className="m-1">
                  <Link to={PRODUCT_ROUTE + "/" + product.id} className="w-100">
                    <Button variant="outline-success" className="w-100">Просмотр</Button>
                  </Link>
                </Row>
                <Row className="m-1">
                  <Button
                    variant="outline-danger"
                    onClick={() => likes.setDeleteItemLikes(product, true)}
                  >
                    Удалить
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default LikesItem;
