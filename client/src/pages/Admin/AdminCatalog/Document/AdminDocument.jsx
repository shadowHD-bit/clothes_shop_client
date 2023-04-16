import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import { AiFillFileExcel, AiOutlineDownload } from "react-icons/ai";
import {
  fetchBrandExcel,
  fetchOrderExcel,
  fetchProductExcel,
  fetchRemnantsExcel,
  fetchTypeExcel,
  fetchUserExcel,
} from "../../../../http/excelAPI";
import { createMoreProduct } from "../../../../http/productAPI";
import "./AdminDocument.scss";
import * as XLSX from "xlsx";
import ExcelItemAdmin from "../../../../components/AdminItems/ExcelItemAdmin";
import { Link } from "react-router-dom";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import {
  downloadPatternProductExcel,
  getBrandDataExcel,
  getOrderDataExcel,
  getProductDataExcel,
  getRemnantsExcel,
  getTypeDataExcel,
  getUserDataExcel,
} from "../../../../utils/helpers/documentParse.helper";

const AdminDocument = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalUpload, setShowModalUpload] = useState(false);
  const handleCloseModalUpload = () => setShowModalUpload(false);
  const handleShowModalUpload = () => setShowModalUpload(true);

  const [file, setFile] = useState(null);
  const selectFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setFile(null);
        setFile(e.target.result);
      };
    }
  };

  const [excelData, setExcelData] = useState(null);

  const getExcelData = () => {
    if (file) {
      const workbook = XLSX.read(file, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  };

  const uploadInDatabase = () => {
    createMoreProduct(excelData).then((data) => handleCloseModalUpload());
  };

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Документы"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с документами...
                </Alert.Heading>
                <p>
                  Здесь ты можешь получить необходимые данные в формате .xlsx:
                </p>
                <ul>
                  <li>
                    Перейдите на определенную позицию в таблице и выберите
                    интересующий раздел
                  </li>
                  <li>
                    Если необходимо выгрузить данные, то прочитайте описание и
                    нажмите кнопку "Получить данные о ..."
                  </li>
                  <li>
                    Если необходимо загрузить данные, то прочитайте описание,
                    скачайте определенный формат документа, заполните его и
                    загрузите в модальное окно.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getProductDataExcel()}
                  >
                    <AiFillFileExcel />
                    Получить данные о товарах
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех товарах, которые представлены
                  на страницы в магазине для удобной работы с этими данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModalUpload}
                  >
                    Загрузить данные товара
                  </Button>
                </td>
                <td>
                  Вы можете загрузить данные о товарах с помощью файла формата
                  xlsx. Для этого:
                  <ol>
                    <li>
                      Скачайте шаблон файла формата .xlsx{" "}
                      <Button
                        variant="success"
                        onClick={() => downloadPatternProductExcel()}
                      >
                        <AiOutlineDownload />
                      </Button>
                      .
                    </li>
                    <li>Введите необходимые параметры товаров.</li>
                    <li>
                      Нажмите кнопку загрузить данные о товарах и загрузите
                      созданный файл формата .xlsx.
                    </li>
                    <li>
                      Перейди в админ-панел на страницу "Работа с товарами" и
                      загрузить недостающие параметры для товара.
                    </li>
                    <li>
                      Включите отображение товара на странице "Работа с
                      товарами" и товар отобразиться на главной странице.
                    </li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getUserDataExcel()}
                  >
                    <AiFillFileExcel />
                    Получить данные о пользователях
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех пользователях, которые
                  зарегистрированы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getTypeDataExcel()}
                  >
                    <AiFillFileExcel />
                    Получить данные о типах
                  </Button>
                </td>
                <td>
                  {" "}
                  Вы можете получить данные о всех типах товарах, которые
                  представлены на страницы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getBrandDataExcel()}
                  >
                    <AiFillFileExcel />
                    Получить данные о брендах
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех брендах товарах, которые
                  представлены на страницы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModal}
                  >
                    <AiFillFileExcel />
                    Получить данные о заказах
                  </Button>
                </td>
                <td>
                  {" "}
                  Вы можете получить данные о всех заказах, которыекоторые были
                  оформлены в магазине для удобной работы с этими данными. Для
                  этого:
                  <ol>
                    <li>Нажмите кнопку "Получить данные о заказах".</li>
                    <li>Выбирите статус заказа, который вас интересует.</li>
                  </ol>
                </td>
              </tr>

              <tr>
                <td>
                  <Link to="/files/Offer_SHOP_RU.pdf" target="_blank" download>
                    <Button className="w-100" variant="info">
                      <AiFillFileExcel />
                      Официальная оферта
                    </Button>
                  </Link>
                </td>
                <td>
                  {" "}
                  Вы можете получить данные официальную оферту веб-сервиса.
                </td>
              </tr>

              <tr>
                <td>
                  <Link
                    to="/files/Refund_blank_SHOP_RU.pdf"
                    target="_blank"
                    download
                  >
                    <Button className="w-100" variant="info">
                      <AiFillFileExcel />
                      Договор на возврат
                    </Button>
                  </Link>
                </td>
                <td>
                  {" "}
                  Вы можете получить документ договора на возврат товара.
                </td>
              </tr>

              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="primary"
                    onClick={() => getRemnantsExcel()}
                  >
                    <AiFillFileExcel />
                    Остатки товара
                  </Button>
                </td>
                <td>
                  Вы можете получить таблицу данных об доступном количестве
                  товара, который представлен на странице веб-сервиса.
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Выберите статус заказа
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="mr-2" onClick={() => getOrderDataExcel("all")}>
            Все
          </Button>
          <Button
            className="mr-2"
            onClick={() => getOrderDataExcel("completed")}
          >
            Завершенные
          </Button>
          <Button
            className="mr-2"
            onClick={() => getOrderDataExcel("not-completed")}
          >
            Не завершенные
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalUpload}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseModalUpload}
      >
        <Modal.Header closeButton>
          <Modal.Title>Импорт данный</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Загрузите файл в формате XLSX или XLS:
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <br />
          {!excelData ? (
            <div>Нет данных</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Наименование</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Описание</th>
                    <th scope="col">ID бренда</th>
                    <th scope="col">ID типа</th>
                  </tr>
                </thead>
                <tbody>
                  <ExcelItemAdmin excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => getExcelData()}>
            Отобразить данные
          </Button>
          <Button
            onClick={() => uploadInDatabase()}
            variant="success"
            disabled={excelData != null ? false : true}
          >
            Загрузить данные
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AdminDocument;
