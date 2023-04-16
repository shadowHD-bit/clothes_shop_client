import React from "react";
import { Button, ButtonGroup, Col } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import useModal from "../../hooks/useModal";
import { deleteCoupon } from "../../http/couponAPI";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";

export default function CouponsItemAdmin({code, id, discount, reRender}) {
    const { showModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <Col xs={"auto"}>
        <ButtonGroup size="mb" style={{ width: "min-content" }}>
          <Button variant="danger" disabled={true}>
            {code} ({discount}%)
          </Button>
          <Button variant="danger">
            <BsTrash onClick={() => handleOpenModal()} />
          </Button>
        </ButtonGroup>
      </Col>

      {showModal && (
        <DeleteSureModal
          text={`Вы уверены, что хотите удалить купон "${code}" на скидку ${discount}% ?`}
          show={showModal}
          handleClose={handleCloseModal}
          action={() =>  deleteCoupon(id)}
          reRender={reRender}
        />
      )}
    </>
  );
}
