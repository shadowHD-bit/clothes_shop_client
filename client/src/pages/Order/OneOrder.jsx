import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CreateReview } from "../../components/modals/CreateReview";
import DetailsOrder from "../../components/modals/DetailOrder";
import DetailsPostedReview from "../../components/modals/DetailPostedReview";
import { getOneOrderProducts } from "../../http/orderAPI";
import { PRODUCT_ROUTE } from "../../utils/consts";

const OneOrder = ({ id, complete, createdAt, updatedAt, reRender }) => {
  const [modalReview, setShowReview] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  const [pickedSize, setPickedSize] = useState("");
  const [pickedReview, setPickedReview] = useState([]);

  //modal delete
  const handleCloseReviews = () => setShowReview(false);
  const handleShowReviews = (prodId, size) => {
    setShowReview(true);
    setProductId(prodId);
    setPickedSize(size);
  };

  const [modalDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const [modalPostedReview, setShowPostedReview] = useState(false);
  const handleClosePostedReviews = () => setShowPostedReview(false);
  const handleShowPostedReviews = (review) => {
    setShowPostedReview(true);
    setPickedReview(review);
    console.log(review);
  };

  useEffect(() => {
    getOneOrderProducts(id).then((data) => setProductInfo(data));
  }, []);

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const [productId, setProductId] = useState();

  return (
    <>
      <Card className="mt-1 p-0 one_order" key={id}>
        <Card.Header className="order_item_header">
          <Row>
            <Col xs={6}>Номер заказа: {id}</Col>
            <Col xs={6} className="d-flex flex-row justify-content-end">
              <a onClick={() => handleShowDetail()} className="detail_link">
                Детали заказа
              </a>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            {productInfo?.products?.map((item) => {
              let review = item.description.review;
              return (
                <div className="mb-1 row_item_product col-md-12 col-xl-6">
                  <div>
                    <img
                      className="img_item"
                      src={
                        process.env.REACT_APP_API_URL +
                        "products/" +
                        item.description.imgMain
                      }
                      alt=""
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <ul style={{ listStyle: "none" }}>
                      <li className="item_product_name">
                        <Link to={PRODUCT_ROUTE + "/" + item.description.id}>
                          {item.description.name}
                        </Link>
                      </li>
                      <li className="params_item">
                        Номер товара: {item.description.id}
                      </li>
                      <li className="params_item">
                        Цена товара: {item.description.price} РУБ
                      </li>
                      <li className="params_item">Размер: {item.size}</li>
                      <li className="params_item">Количество: {item.count}</li>
                      <li>
                        {complete && review.length == 0 ? (
                          <a
                            className="params_item_btn"
                            onClick={() =>
                              handleShowReviews(item.description.id, item.size)
                            }
                          >
                            Оставить отзыв
                          </a>
                        ) : review.length != 0 ? (
                          <a
                            className="params_item_btn"
                            onClick={() =>
                              handleShowPostedReviews(item.description.review)
                            }
                          >
                            Просмотреть отзыв
                          </a>
                        ) : (
                          <div></div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </Row>
        </Card.Body>
        <Card.Footer className="order_item_footer">
          <Row>
            <Col xs={4}>Статус заказа: {complete ? "Завершен" : "В пути"}</Col>
            <Col xs={4}>Дата создания заказа: {formatDate(createdAt)}</Col>
            <Col xs={4}>
              {" "}
              {complete ? (
                <Row>
                  <Col xs={12}>
                    Дата завершения заказа: {formatDate(updatedAt)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      <CreateReview
        reRender={reRender}
        productId={productId}
        size={pickedSize}
        modalReview={modalReview}
        handleCloseReviews={handleCloseReviews}
      />

      <DetailsOrder
        show={modalDetail}
        handleClose={handleCloseDetail}
        detail={productInfo.detail}
      />
      <DetailsPostedReview
        show={modalPostedReview}
        handleClose={handleClosePostedReviews}
        review={pickedReview}
      />
    </>
  );
};
export default OneOrder;
