import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import {
  createProductSize,
  deleteInfo,
  deleteProductSizeApi,
  fetchBadge,
  fetchBrands,
  fetchOneProduct,
  fetchSizes,
  fetchSizesOneProduct,
  fetchTypes,
  getInfoOneProduct,
  updateProduct,
} from "../../http/productAPI";
import UpdatePageDataProducts from "../../pages/Admin/Admin";
import { BsPen, BsPlus, BsTrash } from "react-icons/bs";
import CreateSizeProduct from "./CreateSizeProduct";
import ChangeSizeProduct from "./UpdateSizeProductModal";

const ChangeProduct = ({
  show,
  onHide,
  productChange,
  updatePage,
  reRenderProduct, idProduct
}) => {
  const thisProduct = { ...productChange };
  const id = thisProduct.id;
  const name = thisProduct.name;
  const price = thisProduct.price;
  const rating = thisProduct.rating;
  const imgMain = thisProduct.imgMain;
  const imgFirst = thisProduct.imgFirst;
  const imgSecond = thisProduct.imgSecond;
  const imgThird = thisProduct.imgThird;
  const info = thisProduct.params;
  const description = thisProduct.description;
  const BrandId = thisProduct.productBrandId;
  const TypeId = thisProduct.productTypeId;
  const sizesArray = thisProduct.size_product;
  const BadgeId = thisProduct.productBadgeId;

  const [valueId, setValueId] = useState(id || "");
  const [valueName, setValueName] = useState(name || "");
  const [valuePrice, setValuePrice] = useState(price || "");
  const [valueRating, setValueRating] = useState(rating || "");
  const [valueImgMain, setValueImgMain] = useState(imgMain || "");
  const [valueDescription, setValueDescription] = useState(description || null);
  const [valueSize, setValueSize] = useState(sizesArray || []);

  const [file, setFile] = useState(null);
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [fileThree, setFileThree] = useState(null);

  const [valueBrand, setValueBrand] = useState(BrandId || "");
  const [valueType, setValueType] = useState(TypeId || "");
  const [valueBadge, setValueBadge] = useState(BadgeId || null);

  const [productAllBrands, setProductAllBrands] = useState([]);
  const [productAllTypes, setProductAllTypes] = useState([]);
  const [productAllBadges, setProductAllBadges] = useState([]);
  const [infoChange, setInfoChange] = useState(info || []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const selectFileOne = (e) => {
    setFileOne(e.target.files[0]);
  };
  const selectFileTwo = (e) => {
    setFileTwo(e.target.files[0]);
  };
  const selectFileThree = (e) => {
    setFileThree(e.target.files[0]);
  };

  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    fetchSizes().then((data) => {
      if (data) {
        setSizes(data.rows);
      }
    });
  }, []);

  const [renderSize, setRenderSize] = useState(false);
  const reRenderSize = () => {
    setRenderSize(!renderSize);
  };

  useEffect(() => {
    fetchSizesOneProduct(idProduct).then((data) => {
      setValueSize(data);
    });
  }, [renderSize]);

  React.useEffect(() => {
    setValueName(name);
    setValuePrice(price);
    setValueRating(rating);
    setValueImgMain(imgMain);
    setValueBrand(BrandId);
    setValueType(TypeId);
    setValueBadge(BadgeId);
    setInfoChange(info);
    setValueDescription(description);
    setValueSize(sizesArray);
  }, [name, price, rating, imgMain, BrandId, TypeId, description]);

  // useState(() => {
  //   setInfoChange(infoChange)
  // }, [infoChange])

  useEffect(() => {
    fetchBrands().then((data) => setProductAllBrands(data.rows));
  }, []);
  useEffect(() => {
    fetchTypes().then((data) => setProductAllTypes(data.rows));
  }, []);
  useEffect(() => {
    fetchBadge().then((data) => setProductAllBadges(data.rows));
  }, []);

  const deleteInfoWithoutArrayInfo = (ind) => {
    if (ind.id == 9999999) {
      setInfoChange(infoChange.filter((item) => item !== ind));
    } else {
      deleteInfo(ind.id).then((data) => {
        setInfoChange(infoChange.filter((item) => item !== ind));
      });
    }
  };

  const changeProduct = () => {
    const formData = new FormData();
    formData.append("name", valueName);
    formData.append("price", valuePrice);
    if (file) {
      formData.append("imgMain", file);
    }
    if (fileOne) {
      formData.append("imgAdditionallyFirst", fileOne);
    }
    if (fileTwo) {
      formData.append("imgAdditionallySecond", fileTwo);
    }
    if (fileThree) {
      formData.append("imgAdditionallyThird", fileThree);
    }
    formData.append("productBrandId", valueBrand);
    formData.append("productTypeId", valueType);
    formData.append("description", valueDescription);
    formData.append("productBadgeId", valueBadge);
    formData.append("info", JSON.stringify(infoChange));
    updateProduct(id, formData).then(() => {
      setTimeout(() => reRenderProduct(), 250);
    });
    onHide();
    updatePage();
  };

  const [addedTitle, setAddedTitle] = useState("");
  const [addDescription, setAddedDescription] = useState("");

  const createInfoItem = () => {
    if (addedTitle !== "" && addDescription !== "") {
      infoChange.push({
        id: 9999999,
        title: addedTitle,
        description: addDescription,
      });
      setInfoChange(infoChange);
      setAddedTitle("");
      setAddedDescription("");
    }
  };

  const [thisCount, setThisCount] = useState(0);
  const [thisSizeId, setThisSizeId] = useState(0);
  const [thisSizeName, setThisSizeName] = useState("");

  const [openModalAddSize, setOpenModalAddSize] = useState(false);
  const [openModalChangeSize, setOpenModalChangeSize] = useState(false);

  const handleModalAddSize = (state, sizeId, sizeName) => {
    setOpenModalAddSize(state);
    setThisSizeId(sizeId);
    setThisSizeName(sizeName);
  };

  const handleModalChangeSize = (state, sizeId, sizeName, counting) => {
    setThisCount(counting);
    setOpenModalChangeSize(state);
    setThisSizeId(sizeId);
    setThisSizeName(sizeName);
  };

  const sortSize = (arr) => {
    //Sort
    let numbers = [];
    let strings = [];

    arr.forEach((e) => (isNaN(e.number_size) ? strings : numbers).push(e));

    numbers = numbers.sort(
      (a, b) => Number(a.number_size) - Number(b.number_size)
    );
    strings = strings.sort();

    return numbers.concat(strings);
  };

  return (
    <Modal show={show} onHide={onHide} size={"xl"} fullscreen={true} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Параметры товара {thisProduct.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={8}>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Название товара
                  </Form.Label>
                  <Form.Control
                    className="mb-1"
                    value={valueName || ""}
                    onChange={(nameProduct) =>
                      setValueName(nameProduct.target.value)
                    }
                    placeholder={"Введите название типа"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Цена товара
                  </Form.Label>
                  <Form.Control
                    className="mb-1"
                    value={valuePrice || ""}
                    onChange={(e) => setValuePrice(e.target.value)}
                    placeholder={"Введите название типа"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Бренд
                  </Form.Label>
                  <Form.Select
                    aria-label="select"
                    value={valueBrand}
                    onChange={(e) => setValueBrand(e.target.value)}
                  >
                    {productAllBrands?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Тип
                  </Form.Label>
                  <Form.Select
                    aria-label="select"
                    value={valueType}
                    onChange={(e) => setValueType(e.target.value)}
                  >
                    {productAllTypes?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Бадж
                  </Form.Label>
                  <Form.Select
                    aria-label="select"
                    value={valueBadge}
                    onChange={(e) => setValueBadge(e.target.value)}
                  >
                    <option value={null}>Не указано</option>

                    {productAllBadges?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                  Описание
                </Form.Label>
                <Form.Control
                  as="textarea"
                  aria-label="Description"
                  onChange={(e) => setValueDescription(e.target.value)}
                  value={valueDescription}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="border-right pt-3">
                <Row className="d-flex flex-row justify-content-between pb-3">
                  <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                    Параметры товара
                  </Form.Label>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Наименование"
                        value={addedTitle}
                        onChange={(e) => setAddedTitle(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Параметр"
                        value={addDescription}
                        onChange={(e) => setAddedDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Button onClick={() => createInfoItem()}>
                      Создать <BsPlus />
                    </Button>
                  </Col>
                </Row>
                {infoChange ? (
                  infoChange.map((item) => (
                    <Row className="mt-2">
                      <Col xs={8}>
                        <p>
                          <b>{item.title}</b> : {item.description}
                        </p>
                      </Col>
                      <Col
                        xs={4}
                        className="d-flex flex-row justify-content-end"
                      >
                        <Button
                          variant="danger"
                          onClick={() => deleteInfoWithoutArrayInfo(item)}
                        >
                          <BsTrash />
                        </Button>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>Нет параметров...</p>
                )}
              </Col>
              <Col xs={6} className="pt-3">
                <Form.Label style={{ color: "#BB2A31", fontWeight: "bold" }}>
                  Доступные размеры
                </Form.Label>
                <Row>
                  {sortSize(sizes)?.map((item) => (
                    <Col xs={3} className="mb-2">
                      <Button
                        onClick={
                          valueSize?.find((x) => x.sizeId === item.id) !=
                          undefined
                            ? // ? () => changeStatusSize(item.id, true)
                              // : () => changeStatusSize(item.id, false)
                              () =>
                                handleModalChangeSize(
                                  true,
                                  item.id,
                                  item.size,
                                  Number(
                                    valueSize?.find((x) => x.sizeId === item.id)
                                      .count
                                  )
                                )
                            : () => handleModalAddSize(true, item.id, item.size)
                        }
                        variant={
                          valueSize?.find((x) => x.sizeId === item.id) !=
                          undefined
                            ? "success"
                            : "danger"
                        }
                        className="w-100"
                      >
                        {valueSize?.find((x) => x.sizeId === item.id) !=
                        undefined
                          ? item.size +
                            "(" +
                            valueSize?.find((x) => x.sizeId === item.id).count +
                            " шт)"
                          : item.size}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} className="border-left p-3">
            <Form>
              <Form.Group controlId="formFile">
                <Row className="d-flex justify-content-center">
                  {file ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL +
                        "products/" +
                        thisProduct.imgMain
                      }
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileOne ? (
                    <Image
                      src={URL.createObjectURL(fileOne)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL +
                        "products/" +
                        thisProduct.imgAdditionallyFirst
                      }
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileOne}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileTwo ? (
                    <Image
                      src={URL.createObjectURL(fileTwo)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL +
                        "products/" +
                        thisProduct.imgAdditionallySecond
                      }
                      style={{ width: "60%" }}
                    ></Image>
                  )}

                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileTwo}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileThree ? (
                    <Image
                      src={URL.createObjectURL(fileThree)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL +
                        "products/" +
                        thisProduct.imgAdditionallyThird
                      }
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileThree}
                  />
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={changeProduct}>
          Изменить
        </Button>
      </Modal.Footer>

      <CreateSizeProduct
        show={openModalAddSize}
        onHide={() => handleModalAddSize(false)}
        productId={id}
        productName={name}
        sizeId={thisSizeId}
        reRender={reRenderSize}
        size={thisSizeName}
      />

      <ChangeSizeProduct
        show={openModalChangeSize}
        onHide={() => handleModalChangeSize(false)}
        productId={id}
        productName={name}
        sizeId={thisSizeId}
        countProduct={thisCount}
        reRender={reRenderSize}
        size={thisSizeName}
      />
    </Modal>
  );
};

export default ChangeProduct;
