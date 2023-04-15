import React, { useContext, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../../..";
import { updateUserDataAvatar } from "../../../../http/userAPI";
import ModalTitle from "../../../../components/UI/ModalTitle/ModalTitle";

import "./ChangeAvatarModal.scss";

export default function ChangeAvatarModal({ show, handleClose, reRender }) {
  const { user } = useContext(Context);

  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeDataUserAvatar = () => {
    const formData = new FormData();
    formData.append("avatar", file);
    updateUserDataAvatar(user.userProf.id, formData).then((data) => {
      if (show) {
        handleClose();
      }
      reRender();
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <ModalTitle firstText={"Изменение"} secondText={"аватара"} />
        </Modal.Header>
        <Modal.Body>
          <Row className="flex justify-content-center">
            {file === null ? (
              <div
                className="test_avatar"
                style={{
                  backgroundImage: `url(${
                    user.userProf.avatarFlag
                      ? user.userProf.avatar
                      : process.env.REACT_APP_API_URL +
                        "avatars/" +
                        user.userProf.avatar
                  })`,
                }}
              ></div>
            ) : (
              <div
                className="test_avatar"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(file)})`,
                }}
              ></div>
            )}
          </Row>
          <Row>
            <Form.Control
              required
              className="mt-3"
              type="file"
              onChange={selectFile}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={file ? false : true}
            onClick={() => changeDataUserAvatar()}
          >
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
