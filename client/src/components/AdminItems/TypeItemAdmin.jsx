import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import ChangeType from "../modals/ChangeType";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";
import { deleteType } from "../../http/productAPI";

const TypeItemAdmin = ({
  id,
  name,
  img_now,
  reRender,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showChange, setShowChange] = useState(false);
  const handleCloseChange = () => setShowChange(false);
  const handleShowChange = () => setShowChange(true);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <Button variant="warning">
            <BsPencilFill size={15} onClick={() => handleShowChange()} />
          </Button>
        </td>
        <td>
          <Button variant="danger">
            <AiFillDelete size={15} onClick={() => handleShowDelete()} />
          </Button>
        </td>
      </tr>

      {showChange && (
        <ChangeType
          id={id}
          name={name}
          img_now={img_now}
          show={showChange}
          onHide={handleCloseChange}
          reRender={reRender}
        />
      )}

      <DeleteSureModal
        text={`Вы уверены, что хотите удалить тип "${name}"`}
        show={showDelete}
        handleClose={handleCloseDelete}
        action={() => deleteType(id)}
        reRender={reRender}
      />
    </>
  );
};
export default TypeItemAdmin;
