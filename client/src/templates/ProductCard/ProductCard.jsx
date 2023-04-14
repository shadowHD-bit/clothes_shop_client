import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { BsCartPlus, BsFillPeopleFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import "./ProductCard.scss";
import { Context } from "../..";
import { fetchOneProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { addProductToLikes } from "../../http/likesAPI";
import { CgHeart } from "react-icons/cg";
import { IoMdShirt } from "react-icons/io";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MdLabelOutline } from "react-icons/md";

const ProductCard = observer(({ product }) => {
  const { user, likes } = useContext(Context);

  const isProductInLikes = (prod) => {
    const findProduct = likes.Likes.findIndex(
      (item) => Number(item.id) === Number(prod.id)
    );
    return findProduct < 0;
  };

  const addProductInLikes = (product) => {
    if (user.isAuth) {
      addProductToLikes(product.id).then(() => likes.setLikes(product, true));
    } else {
      likes.setLikes(product);
    }
  };

  const [productIn, setProductIn] = useState({ info: [] });

  useEffect(() => {
    fetchOneProduct(product.id).then((data) => setProductIn(data));
  }, []);

  return (
    <>
      {/* <Col xs={12} md={6} xl={4} className="p-0">
        <Card className="product_card" style={{ boxShadow: "none" }}>
          <Card.Img
            variant="top"
            className="img_card"
            style={{ boxShadow: "none" }}
            src={process.env.REACT_APP_API_URL + 'products/' + product.imgMain}
          />
          <Card.Body style={{ boxShadow: "none", minHeight: "200px" }}>
            <Card.Text>
              {product.productBadgeId !== null ? (
                <Badge bg="danger">{product.badge.name}</Badge>
              ) : (
                ""
              )}{" "}
              <Badge bg="danger">{product.brand.name}</Badge>{" "}
              <Badge bg="danger">{product.type.name}</Badge>{" "}
            </Card.Text>
            <Link to={PRODUCT_ROUTE + "/" + product.id}>
              <Card.Title className="title_card">{product.name}</Card.Title>
            </Link>
            <Card.Text className="price_card">{product.price} РУБ</Card.Text>
          </Card.Body>
          <Card.Footer style={{ boxShadow: "none" }}>
            {isProductInLikes(productIn) ? (
              <Button
                className="btn_like_out"
                onClick={() => addProductInLikes(productIn)}
                disabled={!user.isAuth ? true : false}
              >
                <CgHeart />
              </Button>
            ) : (
              <Button
                className="btn_like_in"
                onClick={() => likes.setDeleteItemLikes(productIn, true)}
                disabled={!user.isAuth ? true : false}
              >
                <CgHeart />
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Col> */}

      <Col xs={12} md={6} xl={4} className="p-0">
        <Card
          className="product_card-page"
          style={{
            backgroundImage: `url(${
              process.env.REACT_APP_API_URL + "products/" + product.imgMain
            })`,
          }}
        >
          <Card.Body className="popular_product_card-body">
            <Row className="p-0 m-0 product-param">
              <Row className="p-0 m-0 product-brand">
                <Col xs={"auto"} className="p-0 m-0 text">
                  <p className="p-0 m-0">{product.brand.name}</p>
                </Col>
                <Col xs={"auto"} className="p-0 m-0">
                  <BsFillPeopleFill size={20} />
                </Col>
              </Row>
              <Row className="p-0 m-0 product-type">
                <Col xs={"auto"} className="p-0 m-0 text">
                  <p className="p-0 m-0">{product.type.name}</p>
                </Col>
                <Col xs={"auto"} className="p-0 m-0">
                  <IoMdShirt size={20} />
                </Col>
              </Row>
              {product.productBadgeId !== null ? (
                <Row className="p-0 m-0 product-type">
                  <Col xs={"auto"} className="p-0 m-0 text">
                    <p className="p-0 m-0">{product.badge.name}</p>
                  </Col>
                  <Col xs={"auto"} className="p-0 m-0">
                    <MdLabelOutline size={20} />
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Row>
            <Row className="btn-container d-flex flex-column align-items-center justify-content-center">
              <Col
                xs={12}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                {isProductInLikes(productIn) ? (
                  <button
                    className="btn_like_out"
                    onClick={() => addProductInLikes(productIn)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <CgHeart />
                  </button>
                ) : (
                  <button
                    className="btn_like_in"
                    onClick={() => likes.setDeleteItemLikes(productIn, true)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <CgHeart />
                  </button>
                )}
              </Col>
              <Col
                xs={12}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <Link to={PRODUCT_ROUTE + "/" + product.id}>
                  <button className="btn_eye">
                    <AiOutlineEye />
                  </button>
                </Link>
              </Col>
            </Row>
            <Row className="p-0 m-0 product-name">
              <p>
                <Link to={PRODUCT_ROUTE + "/" + product.id}>
                  {product.name}
                </Link>
              </p>
            </Row>
            <Row className="p-0 m-0 product-price">
              <p>{product.price} РУБ</p>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
});

export default ProductCard;
