import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import {
  createSize,
  deleteSizeApi,
  fetchSizes,
} from "../../../../http/productAPI";
import "./SizeAdmin.scss";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import useRerender from "../../../../hooks/useRerender";
import useToast from "../../../../hooks/useToast";
import ToastError from "../../../../components/Toast/Toast";
import SizeItemAdmin from "../../../../components/AdminItems/SizeItemAdmin";

const SizeAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [valueSize, setValueSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const { render, reRender } = useRerender();

  const {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  } = useToast();

  useEffect(() => {
    fetchSizes().then((data) => {
      if (data) {
        setSizes(data.rows);
      }
    });
  }, [render]);

  const sortSize = (arr) => {
    let numbers = [];
    let strings = [];
    arr.forEach((e) => (isNaN(e.size) ? strings : numbers).push(e));
    numbers = numbers.sort((a, b) => Number(a.size) - Number(b.size));
    strings = strings.sort();
    return numbers.concat(strings);
  };

  const addedSize = () => {
    const formData = new FormData();
    if (valueSize != "") {
      formData.append("size", valueSize);
      createSize(formData)
        .then((data) => {
          setSysMessage("Размер добавлен!");
          handleOpenToast();
          setValueSize("");
          reRender();
        })
        .catch((e) => {
          setSysMessage(e.response.data.message);
          handleOpenToast();
        });
    }else{
      setSysMessage("Введите размер!");
      handleOpenToast();
    }
  };

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Размеры"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с размерами...
                </Alert.Heading>
                <p>Здесь ты можешь работать с размерами:</p>
                <ul>
                  <li>
                    Если необходимо добавить размер, то введи необходимый размер
                    и нажми кнопку "Добавить".
                  </li>
                  <li>
                    Если необходимо удалить размер, то выбири размер из списка и
                    нажми на иконку корзины.
                  </li>
                </ul>
                <p>
                  ВНИМАНИЕ! Если вы удалите размер, который указан в параметрах
                  товара, то этот параметр будет удален и из характеристик
                  товара!
                </p>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Control
                type="text"
                placeholder="Введите размер"
                value={valueSize}
                onChange={(e) => setValueSize(e.target.value)}
              />
            </Form>
          </Col>
          <Col>
            <Button variant="outline-success" onClick={() => addedSize()}>
              Добавить
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          {sortSize(sizes).map((item) => (
            <SizeItemAdmin
              key={item.id}
              id={item.id}
              size={item.size}
              reRender={reRender}
            />
          ))}
        </Row>
      </Container>

      {showToast && (
        <ToastError
          showToast={showToast}
          handleCloseToast={handleCloseToast}
          message={sysMessage}
        />
      )}
    </>
  );
};
export default SizeAdmin;
