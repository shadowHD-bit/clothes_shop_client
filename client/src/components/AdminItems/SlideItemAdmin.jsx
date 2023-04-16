import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";
import { deleteSlider } from "../../http/sliderAPI";
import ChangeSlides from "../../templates/Modal/AdminSlider/ChangeSlideModal/ChangeSlideModal";
import DeleteSureModal from "../../templates/Modal/DeleteSureModal/DeleteSureModal";

export default function SlideItemAdmin(props) {
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showChange, setShowChange] = useState(false);
  const handleCloseChange = () => setShowChange(false);
  const handleShowChange = () => setShowChange(true);

  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td className=" d-xl-table-cell d-none">{props.text}</td>
        <td className=" d-xl-table-cell d-none">
          <Image
            src={process.env.REACT_APP_API_URL + "slides/" + props.img}
            width={"100px"}
          />
        </td>
        <td>
          <Button variant="warning">
            <BsPenFill size={15} onClick={() => handleShowChange()} />
          </Button>
        </td>
        <td>
          <Button variant="danger">
            <AiFillDelete size={15} onClick={() => handleShowDelete()} />
          </Button>
        </td>
      </tr>

      <ChangeSlides
        show={showChange}
        onHide={() => handleCloseChange()}
        id={props.id}
        reRender={props.reRender}
      />

      {showDelete && (
        <DeleteSureModal
          text={`Вы уверены, что хотите удалить слайд?`}
          show={showDelete}
          handleClose={handleCloseDelete}
          action={() => deleteSlider(props.id)}
          reRender={props.reRender}
        />
      )}
    </>
  );
}
