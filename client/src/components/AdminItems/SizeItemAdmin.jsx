import React from "react";
import { Button, ButtonGroup, Col } from "react-bootstrap";
import { deleteSizeApi } from "../../http/productAPI";
import useModal from "../../hooks/useModal";
import { BsTrash } from "react-icons/bs";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";

export default function SizeItemAdmin({ size, id, reRender }) {
    const { showModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <Col xs={"auto"} className="mb-2">
        <ButtonGroup size="mb">
          <Button variant="danger" disabled={true}>
            {size}
          </Button>
          <Button variant="danger" onClick={() => handleOpenModal()}>
            <BsTrash />
          </Button>
        </ButtonGroup>
      </Col>

      {showModal && (
        <DeleteSureModal
          text={`Вы уверены, что хотите удалить размер "${size}"?`}
          show={showModal}
          handleClose={handleCloseModal}
          action={() => deleteSizeApi(id)}
          reRender={reRender}
        />
      )}
    </>
  );
}
