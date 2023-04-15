import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import SlideItemAdmin from "../../../../components/AdminItems/SlideItemAdmin";
import ChangeSlides from "../../../../components/modals/ChangeSlide";
import CreateSlider from "../../../../components/modals/CreateSlides";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchSlider } from "../../../../http/sliderAPI";
import AdminTitle from "../../../../components/UI/AdminTitle/AdminTitle";

const AdminSlider = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [slideCreateVisible, setSlideCreateVisible] = useState(false);

  const [slides, setSlides] = useState([]);
  useEffect(() => {
    fetchSlider().then((data) => {
      setSlides(data.rows);
    });
  }, []);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchSlider().then((data) => {
      setSlides(data.rows);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

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
          <Col xs={6}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => setSlideCreateVisible(true)}
            >
              Добавить слайд
            </Button>
          </Col>
          <Table striped bordered hover className="mt-4 p-2">
            <thead>
              <tr>
                <th>ID слайда</th>
                <th>Заголовок</th>
                <th>Текст</th>
                <th>Изображение</th>
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
        </Row>
      </Container>

      <CreateSlider
        reRender={reRender}
        show={slideCreateVisible}
        onHide={() => setSlideCreateVisible(false)}
      />
    </>
  );
};
export default AdminSlider;
