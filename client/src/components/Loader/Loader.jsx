import React from "react";
import { Container, Spinner } from "react-bootstrap";

import './Loader.scss'

export default function Loader() {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-start loader-container"
      >
        <Spinner animation="border" variant="danger" style={{ width: "4rem", height: "4rem" }} />
      </Container>
    </>
  );
}
