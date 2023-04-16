import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import SlideItemAdmin from "../../../../components/AdminItems/SlideItemAdmin";
import CreateSlider from "../../../../templates/Modal/AdminSlider/CreateSlideModal/CreateSlideModal";
import { fetchSlider } from "../../../../http/sliderAPI";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";
import useRerender from "../../../../hooks/useRerender";

import './AdminSlider.scss'
import useModal from "../../../../hooks/useModal";

const AdminSlider = () => {
  const [showAlert, setShowAlert] = useState(true);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();


  const { render, reRender } = useRerender();

  const [slides, setSlides] = useState([]);
  useEffect(() => {
    fetchSlider().then((data) => {
      setSlides(data.rows);
    });
  }, [render]);

  return (
    <>
      <Container className="admin_container">
        <AdminTitle charter={'Раздел "Слайдер"'} />

        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы со слайдером...
                </Alert.Heading>
                <p>Здесь ты можешь работать со слайдером:</p>
                <ul>
                  <li>
                    Чтобы изменить информацию слайдера, нажмите кнопку
                    "Удалить/изменить слайдер", выбирите интересующий слайд и
                    укажите необходимую информацию.
                  </li>
                  <li>
                    Чтобы удалить слайд, нажмите кнопку "Удалить/изменить слайд,
                    выберите нужный слайд и нажмите кнопку "Удалить".
                  </li>
                  <li>
                    Чтобы добавить слайд, нажмите кнопку "Добавить слайд",
                    укажите необходимую информацию и нажмите кнопку "Добавить".
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => handleOpenModal()}
            >
              Добавить слайд
            </Button>
          </Col>
          <Col xs={12}>
            <Table striped bordered hover className="mt-4 p-2 slides-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Заголовок</th>
                  <th className=" d-xl-table-cell d-none">Текст</th>
                  <th className=" d-xl-table-cell d-none">Изображение</th>
                  <th>Изменить</th>
                  <th>Удалить</th>
                </tr>
              </thead>
              <tbody>
                {slides
                  ?.sort((a, b) => a.id - b.id)
                  .map((slide) => (
                    <SlideItemAdmin
                      key={slide.id}
                      id={slide.id}
                      title={slide.title}
                      text={slide.text}
                      img={slide.img}
                      reRender={reRender}
                    />
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <CreateSlider
        reRender={reRender}
        show={showModal}
        onHide={() => handleCloseModal()}
      />
    </>
  );
};
export default AdminSlider;
