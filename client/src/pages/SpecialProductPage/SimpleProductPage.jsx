import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  fetchOneProduct,
  addProductToBasket,
  getProductDescription,
  fetchSizesOneProduct,
  getProductFromBasket,
} from "../../http/productAPI";
import { BASKET_ROUTE } from "../../utils/consts";
import { BsCheckLg, BsHeart } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import "./Simple.scss";
import RatingStars from "../../components/RatingStar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import {
  createQuestion,
  fetchQuestion,
  fetchQuestionProduct,
  getBoolUserUnCompleteQuestion,
} from "../../http/questionAPI";
import { fetchReviewsProduct } from "../../http/reviewsAPI";
import ReviewUI from "../../components/UI/Review/ReviewUI";
import { addProductToLikes } from "../../http/likesAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import QuestionModal from "../../components/UI/Modals/AddQuestionModal/QuestionModal";
import ErrorAuthModalQuestion from "../../components/UI/Modals/ErrorAuthModalQuestion/ErrorAuthModalQuestion";
import ErrorAddQuestionModal from "../../components/UI/Modals/ErrorAddQuestionModal/ErrorAddQuestionModal";
import { Rating } from "@material-ui/lab";
import SizeProductModal from "../../components/UI/Modals/SizeProductModal/SizeProductModal";
import { addHistoryView } from "../../http/historyAPI";

const SimpleProduct = observer(() => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { user, basket, likes } = useContext(Context);

  const [product, setProduct] = useState({ params: [] });
  const { id } = useParams();

  const [showSizeProductModal, setShowSizeProductModal] = useState(false);

  const handlerShowSizeProduct = () => {
    setShowSizeProductModal(true);
  };

  const handlerCloseSizeProduct = () => {
    setShowSizeProductModal(false);
  };

  useEffect(() => {
    if (user.isAuth && user.user.id != undefined) {
      const formDataHistory = new FormData();
      formDataHistory.append("productId", id);
      formDataHistory.append("userId", user.user.id);
      addHistoryView(formDataHistory);
    }
  }, []);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    getProductFromBasket().then((data) => {
      setDataBasket(data);
    });
  }, []);

  const [dataBasket, setDataBasket] = useState([]);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);
  const [sizes, setSizes] = useState([{size: {id: 0}}]);

  useEffect(() => {
    fetchSizesOneProduct(id).then((data) => setSizes(data.filter(item => item.count !=0)));
  }, []);
  ////

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = () => setShowErrorModal(true);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const handleCloseQuestionModal = () => setShowQuestionModal(false);
  const handleShowQuestionModal = () => {
    if (user.isAuth) {
      getBoolUserUnCompleteQuestion({
        userId: user.user.id,
        productId: id,
      }).then((data) => {
        if (data) {
          handleShowErrorModal();
        } else {
          setShowQuestionModal(true);
        }
      });
    } else {
      handleShowErrorAuthModal();
    }
  };

  const [showErrorAuthModal, setShowErrorAuthModal] = useState(false);
  const handleCloseErrorAuthModal = () => setShowErrorAuthModal(false);
  const handleShowErrorAuthModal = () => setShowErrorAuthModal(true);

  const [stateQuestion, setStateQuestion] = useState("");

  const [QA, setQA] = useState();

  useEffect(() => {
    fetchQuestionProduct({ id }).then((data) => setQA(data));
  }, [product]);

  const [reviews, setReviews] = useState();

  useEffect(() => {
    fetchReviewsProduct({ id }).then((data) => {
      setReviews(data);
    });
  }, [product]);

  const sortSize = (arr) => {
    //Sort
    let numbers = [];
    let strings = [];

    arr.forEach((e) => (isNaN(e.size.number_size) ? strings : numbers).push(e));

    numbers = numbers.sort(
      (a, b) => Number(a.size.number_size) - Number(b.size.number_size)
    );
    strings = strings.sort();

    return numbers.concat(strings);
  };

  const [changedSize, setChangedSize] = useState("");

  const isProductInBasket = () => {
    let findProduct;
    if (changedSize == "") {
      findProduct = dataBasket.findIndex(
        (item) =>
          Number(item.id) == Number(id) &&
          Number(item.sizeId) == Number(sortSize(sizes)[0].size.id)
      );
    } else {
      findProduct = dataBasket.findIndex(
        (item) =>
          Number(item.id) == Number(id) &&
          Number(item.sizeId) == Number(changedSize)
      );
    }
    return findProduct < 0;
  };

  const isProductInLikes = () => {
    const findProduct = likes.Likes.findIndex(
      (item) => Number(item.id) === Number(id)
    );
    return findProduct < 0;
  };

  const addProductInBasket = (product) => {
    if (user.isAuth) {
      const formData = new FormData();
      formData.append("productId", product.id);
      if (changedSize == "") {
        formData.append("sizeId", sortSize(sizes)[0].size.id);
      } else {
        formData.append("sizeId", changedSize);
      }
      formData.append("count", 1);
      addProductToBasket(formData).then(() => {
        basket.setCount(basket._count + 1);
        basket.setBasket(product, true);
        getProductFromBasket().then((data) => {
          setDataBasket(data);
        });
      });
    } else {
      basket.setBasket(product);
    }
  };

  const addProductInLikes = (product) => {
    if (user.isAuth) {
      addProductToLikes(product.id).then(() => likes.setLikes(product, true));
    } else {
      likes.setLikes(product);
    }
  };

  console.log(QA);
  //////////

  return (
    <>
      <Container className="product_container">
        <Row>
          <Col xs={12} md={12} xl={6} className="slider_product">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgMain
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallyFirst
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallySecond
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallyThird
                  }
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgMain
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallyFirst
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallySecond
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "products/" +
                    product.imgAdditionallyThird
                  }
                />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col xs={12} md={12} xl={6} className="main_info_product">
            <Row>
              <p className="title_product">{product.name}</p>
              <p className="product_code">Код товара: {product.id}</p>
            </Row>
            <Row>
              <p className="price_product">{product.price} РУБ</p>
            </Row>
            <Row className="size_product">
              Размер:
              <Form.Select
                onChange={(e) => setChangedSize(e.target.value)}
                aria-label="Default select example"
              >
                {sortSize(sizes).map((item) => (
                  <option value={item.size.id}>
                    {item.size.size} ({item.count} шт.)
                  </option>
                ))}
              </Form.Select>
              <p
                onClick={() => handlerShowSizeProduct()}
                className="size_guide"
              >
                Подробнее о размере
              </p>
            </Row>
            <Row className="mt-3">
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInBasket(product) ? (
                  <button
                    class="cart_btn"
                    onClick={() => addProductInBasket(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsCartPlus /> Добавить в корзину
                  </button>
                ) : (
                  <a href={BASKET_ROUTE}>
                    <button class="cart_btn_success">
                      <BsCheckLg /> Уже в корзине
                    </button>
                  </a>
                )}
              </Col>
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInLikes(product) ? (
                  <button
                    class="likes_btn"
                    onClick={() => addProductInLikes(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> Добавить в избранное
                  </button>
                ) : (
                  <button
                    class="likes_btn_success"
                    onClick={() => likes.setDeleteItemLikes(product, true)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> В избранном
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Tabs
            defaultActiveKey="description"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="description" title="Описание">
              {<p>{product.description}</p>}
            </Tab>
            <Tab eventKey="characteristics" title="Характеристики">
              {product.params.length == 0 ? (
                <p>У данного товара нет параметров...</p>
              ) : (
                product.params.map((item) => (
                  <p>
                    <b>{item.title}</b> : {item.description}
                  </p>
                ))
              )}
            </Tab>
            <Tab eventKey="reviews" title="Отзывы">
              {reviews?.length == 0 ? (
                <p>На данный товар еще не было отзывов...</p>
              ) : (
                reviews?.map((rew) => {
                  return (
                    <ReviewUI
                      name_user={rew.user.firstName}
                      family_user={rew.user.secondName}
                      img_user={rew.user.avatar}
                      text_review={rew.text}
                      img_review={rew.imgFirst}
                      img_review2={rew.imgSecond}
                      img_review3={rew.imgThird}
                      description_true={rew.descriptionRespond}
                      size_true={rew.sizeRespond}
                      delivery_true={rew.deliveryRespond}
                      isVk={rew.user.isVKAccount}
                      rate={rew.rate}
                      size={rew.size}
                      isGoogle={rew.user.isGoogleAccount}
                    />
                  );
                })
              )}
            </Tab>
            <Tab
              eventKey="question"
              title={
                <>
                  Вопросы{" "}
                  {QA?.length != 0 ? (
                    <span className="badge_span">{QA?.length}</span>
                  ) : (
                    ""
                  )}
                </>
              }
            >
              <Row>
                <Col xs={12} md={12} xl={7}>
                  {QA?.length == 0 ? (
                    <p>По данному товару пока что не было вопросов...</p>
                  ) : (
                    QA?.map((question) => {
                      return (
                        <>
                          <Container fluid>
                            <Row>
                              <Card className="card_qa p-1">
                                <Card.Body>
                                  <Row className="w-100">
                                    <Col xs={12} md={12}>
                                      <Card className="card_question">
                                        <Card.Header className="d-flex flex-row align-items-center">
                                          {question.question.user.avatar.toString().substring(0, 4) == "http" ? (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${question.question.user.avatar})`,
                                              }}
                                            ></div>
                                          ) : (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${
                                                  process.env
                                                    .REACT_APP_API_URL + 'avatars/' +
                                                  question.question.user.avatar
                                                })`,
                                              }}
                                            ></div>
                                          )}{" "}
                                          {question.question.user.firstName}{" "}
                                          {question.question.user.secondName}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.question.questionText}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                    <Col xs={12} md={12}>
                                      <Card className="card_answer">
                                        <Card.Header className="d-flex flex-row align-items-center">
                                          {question.answer.user.avatar.toString().substring(0, 4) == "http" ? (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${question.answer.user.avatar})`,
                                              }}
                                            ></div>
                                          ) : (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${
                                                  process.env
                                                    .REACT_APP_API_URL +'avatars/' +
                                                  question.answer.user.avatar
                                                })`,
                                              }}
                                            ></div>
                                          )}{" "}
                                          {question.answer.user.firstName}{" "}
                                          {question.answer.user.secondName}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.answer.answerText}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Row>
                          </Container>
                        </>
                      );
                    })
                  )}
                </Col>
                <Col
                  xs={12}
                  md={12}
                  xl={5}
                  className="flex align-items-center text-center"
                >
                  <p className="title_add">Задать вопрос</p>
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      "/img/productcard/question_sticker.png"
                    }
                    width={250}
                  />
                  <p className="quest_about_text">
                    Если у вас есть вопрос по данному товару, то вы можете
                    задать его, нажав на кнопку "Задать вопрос" )
                  </p>
                  <Button
                    className="question_btn"
                    onClick={handleShowQuestionModal}
                  >
                    Задать вопрос по товару
                  </Button>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="rating" title="Рейтинг">
              <Row>
                <Col xs={7}>
                  <p className="title_add">Пользовательский рейтинг</p>
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={5}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="success"
                    now={
                      (reviews?.filter((item) => item.rate == 5).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={4}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="info"
                    now={
                      (reviews?.filter((item) => item.rate == 4).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={3}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="warning"
                    now={
                      (reviews?.filter((item) => item.rate == 3).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={2}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="danger"
                    now={
                      (reviews?.filter((item) => item.rate == 2).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={1}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="secondary"
                    now={
                      (reviews?.filter((item) => item.rate == 1).length /
                        reviews?.length) *
                      100
                    }
                  />
                </Col>
                <Col xs={5}>
                  <Row className="d-flex flex-row justify-content-center">
                    <Col className="d-flex flex-row justify-content-center">
                      <Image
                        src={
                          process.env.PUBLIC_URL +
                          "/img/productcard/video-calling.png"
                        }
                        width={250}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {reviews?.length != 0 ? (
                      <p className="quest_about_text text-center">
                        Рейтинг составляет{" "}
                        {reviews
                          ?.map((i) => i.rate)
                          .reduce((a, b) => a + b)/(reviews?.length)}{" "}
                        балл(-а, -ов) и основан на {reviews?.length} отывах(-е)...
                      </p>
                    ) : (
                      <p className="quest_about_text text-center">
                        Еще не один пользователь не оценил данный товар...
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </Container>

      <QuestionModal
        id_user={user.user.id}
        id_product={id}
        showQuestionModal={showQuestionModal}
        handleCloseQuestionModal={handleCloseQuestionModal}
      />
      <ErrorAuthModalQuestion
        stateModal={showErrorAuthModal}
        handleCloseModal={handleCloseErrorAuthModal}
      />
      <ErrorAddQuestionModal
        stateModal={showErrorModal}
        handleCloseModal={handleCloseErrorModal}
      />

      <SizeProductModal
        handleCloseModal={handlerCloseSizeProduct}
        stateModal={showSizeProductModal}
      />
    </>
  );
});

export default SimpleProduct;
