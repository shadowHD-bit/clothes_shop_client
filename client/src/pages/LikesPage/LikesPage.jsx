import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Context } from "../..";
import LikesItem from "./LikesItem";

import "./LikesPage.scss";

const LikesPage = observer(() => {
  const { likes } = useContext(Context);

  if (likes.Likes.length == 0) {
    return (
      <Container>
        <Row>
          <Col>
            <p className="title">
              <span className="red"> Избранные </span> товары
            </p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center empty-page">
          <Col
            xs={12}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              style={{ width: "300px" }}
              src={process.env.PUBLIC_URL + "/img/productcard/tea-time.png"}
            />
          </Col>
          <Col className="text-center" style={{ fontSize: 28 }} xs={12}>
            Упс, у вас пусто...
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container fluid="md" className="likes_container">
        <Row>
          <Col>
            <p className="title">
              <span className="red"> Избранные </span> товары
            </p>
          </Col>
        </Row>
        <Row>
          {likes.Likes.map((product) => (
            <Col xs={12} md={6} className="mt-2">
              <LikesItem key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
});

export default LikesPage;
