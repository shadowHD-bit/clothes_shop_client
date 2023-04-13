import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import "./AboutUs.scss";
import MainInfoAbout from "../../templates/AboutUs/MainInfoAbout/MainInfoAbout";
import CounterAbout from "../../templates/AboutUs/CounterAbout/CounterAbout";
import AboutSite from "../../templates/AboutUs/AboutSite/AboutSite";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";

function AboutUs() {
  return (
    <>
      <Container fluid className="about_us p-0 m-0">
        <Container className="first_null_section"></Container>
          <MainInfoAbout />
          <CounterAbout />
          <AboutSite />
          <NavigationBlock />
        <Container className="about_navigation"></Container>
      </Container>
    </>
  );
}

export default AboutUs;
