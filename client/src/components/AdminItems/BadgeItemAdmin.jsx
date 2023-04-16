import { Button, ButtonGroup, Col } from "react-bootstrap";
import { deleteBadge } from "../../http/productAPI";
import useModal from "../../hooks/useModal";
import { BsTrash } from "react-icons/bs";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";

export default function BadgeItemAdmin({ name, id, reRender }) {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <Col xs={"auto"} className="mb-2">
        <ButtonGroup size="mb" style={{ width: "fit-content" }}>
          <Button variant="danger" disabled={true}>
            {name}
          </Button>
          <Button variant="danger" onClick={() => handleOpenModal()}>
            <BsTrash />
          </Button>
        </ButtonGroup>
      </Col>

      {showModal && (
        <DeleteSureModal
          text={`Вы уверены, что хотите удалить бадж "${name}"?`}
          show={showModal}
          handleClose={handleCloseModal}
          action={() => deleteBadge(id)}
          reRender={reRender}
        />
      )}
    </>
  );
}
