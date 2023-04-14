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
      <Container
        fluid={"md"}
        className="d-flex flex-column align-items-center mt-5 like-null"
      >
        <Row>
          <Image
            src={process.env.PUBLIC_URL + "/img/basket/basketEmpty.png"}
            className="img-empty"
          />
        </Row>
        <Row>
          <Col
            className="text-center mt-5"
            style={{ fontSize: 28, marginBottom: 200 }}
          >
            <b>Упс, у вас пусто...</b>
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
