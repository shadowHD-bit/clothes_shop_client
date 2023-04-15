import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ToastError from "../Toast/Toast";
import {
  fetchDeleteProduct,
  updateDisplayProduct,
} from "../../http/productAPI";
import ChangeProduct from "../modals/ChangeProduct";

const ProductItemAdmin = ({ productItem, reRenderProduct }) => {
  const [changeProductData, setChangeProductData] = useState();
  const [changeVisible, setChangeVisible] = useState(false);
  const [temp, setTemp] = useState(false);

  const deleteProduct = (id) => {
    fetchDeleteProduct(id).then(() => {
      setTimeout(() => reRenderProduct(), 250);
    });
  };

  const changeProduct = (product) => {
    setChangeProductData(product);
    setChangeVisible(true);
  };

  const [showToast, setShowToast] = useState(false);
  const [thisMessage, setThisMessage] = useState("");

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const updateDisplay = (display, id) => {
    updateDisplayProduct({ isDisplay: !display, id })
      .then(() => {
        setTimeout(() => reRenderProduct(), 250);
        setThisMessage("Отображение изменено!");
        setShowToast(true);
      })
      .catch((err) => {
        setThisMessage(err.response.data.message);
        setShowToast(true);
      });
  };

  return (
    <>
      <tr key={productItem.id}>
        <td key={productItem.id}>{productItem.id}</td>
        <td key={productItem.name}>{productItem.name}</td>
        <td key={productItem.price}>{productItem.price}</td>
        <td key={productItem.imgMain}>{productItem.imgMain}</td>
        <td key={productItem.createdAt}>{productItem.createdAt}</td>
        <td key={Math.random() + Math.random()}>
          <Button
            variant={"outline-danger"}
            onClick={() => deleteProduct(productItem.id)}
          >
            Удалить
          </Button>
        </td>
        <td key={Math.random() + Math.random()}>
          <Button
            variant={"outline-primary"}
            onClick={() => changeProduct(productItem)}
          >
            Изменить
          </Button>
        </td>
        <td>
          {productItem.isDisplay ? (
            <Button
              variant="success"
              onClick={() =>
                updateDisplay(productItem.isDisplay, productItem.id)
              }
            >
              +
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() =>
                updateDisplay(productItem.isDisplay, productItem.id)
              }
            >
              -
            </Button>
          )}
        </td>
      </tr>

      <ChangeProduct
        show={changeVisible}
        onHide={() => setChangeVisible(false)}
        productChange={changeProductData}
        updatePage={() => setTemp(!temp)}
        reRenderProduct={reRenderProduct}
        idProduct={productItem.id}
      />

      <ToastError
        onHide={() => handleCloseToast()}
        show={showToast}
        message={thisMessage}
      />
    </>
  );
};
export default ProductItemAdmin;
