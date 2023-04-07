import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DetailUser from "../modals/DetailUser";

export default function UserItemAdmin({ props, reRender }) {
    const [showDetail, setShowDetail] = useState(false);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>
          <Row>
            <Col className="d-flex flex-row align-items-center">
              {(props.isVkAccount || props.isGoogleAccount) &&
              props.avatar.toString().substring(0, 4) == "http" ? (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${props.avatar})`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + "avatars/" + props.avatar
                    })`,
                  }}
                ></div>
              )}{" "}
            </Col>
          </Row>
        </td>
        <td>{props.firstName + " " + props.secondName}</td>
        <td>{props.role}</td>
        <td>{props.createdAt}</td>
        <td>
            <Button variant="primary" onClick={() => setShowDetail(true)}>
                Подробнее
            </Button>
        </td>
      </tr>

      <DetailUser reRender={reRender} show={showDetail} handleClose={handleCloseDetail} data={props}/>
    </>
  );
}
