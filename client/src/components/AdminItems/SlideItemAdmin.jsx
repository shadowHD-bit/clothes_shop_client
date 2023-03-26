import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";
import { deleteSlider } from "../../http/sliderAPI";
import ChangeSlides from "../modals/ChangeSlide";

export default function SlideItemAdmin(props) {
  const [slideChangeVisible, setSlideChangeVisible] = useState(false);

  const handleClickDelete = (id) => {
    deleteSlider(id).then((data) => {
      props.reRender();
    });
  };

  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td>{props.text}</td>
        <td>
          <Image
            src={process.env.REACT_APP_API_URL + "slides/" + props.img}
            width={"100px"}
          />
        </td>
        <td>
          <Button variant="warning">
            <BsPenFill size={15} onClick={() => setSlideChangeVisible(true)}/>
          </Button>
        </td>
        <td>
          <Button variant="danger">
            <AiFillDelete
              size={15}
              onClick={() => handleClickDelete(props.id)}
            />
          </Button>
        </td>
      </tr>

      <ChangeSlides
        show={slideChangeVisible}
        onHide={() => setSlideChangeVisible(false)}
        id={props.id}
        reRender={props.reRender}
      />
    </>
  );
}
