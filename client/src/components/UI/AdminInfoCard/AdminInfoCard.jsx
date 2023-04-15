import React from "react";

import "./AdminInfoCard.scss";
import { Alert, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminInfoCard({ count, title, route, measure }) {
  return (
    <>
      <Col xs={12} md={6} xl={3}>
        <Link to={route}>
          <Alert className="alert_info_main_admin">
            <Alert.Heading className="alert_info_main_admin-heading">{count} {measure}</Alert.Heading>
            {title}
          </Alert>
        </Link>
      </Col>
    </>
  );
}
