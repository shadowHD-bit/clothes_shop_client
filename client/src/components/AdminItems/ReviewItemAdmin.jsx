import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { changeStatus } from "../../http/reviewsAPI";
import DeleteReview from "../modals/DeleteReview";
import DetailsReview from "../modals/DetailsReview";

const ReviewItemAdmin = ({ review_data, reRender }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const changeStatusReview = (id) => {
    changeStatus(id).then(data => {
      reRender()
    })
  }

  return (
    <>
      <tr>
        <th>{review_data.id}</th>
        <th>{review_data.product.name}</th>
        <th>
          <Button onClick={() => handleShowDetail()}>Подробнее</Button>
        </th>
        <th>
          {review_data.isChecked ? (
            <Button variant="danger" onClick={() => changeStatusReview(review_data.id)}>Убрать</Button>
          ) : (
            <Button variant="success" onClick={() => changeStatusReview(review_data.id)}>Опубликовать</Button>
          )}
        </th>
        <th>
          <Button variant="danger" onClick={() => handleShowDelete()}>
            Удалить
          </Button>
        </th>
      </tr>

      <DeleteReview
        reRender={reRender}
        id_review={review_data.id}
        show={showDelete}
        handleClose={handleCloseDelete}
      />
      <DetailsReview
        review_data={review_data}
        show={showDetail}
        handleClose={handleCloseDetail}
      /> 
    </>
  );
};
export default ReviewItemAdmin;
