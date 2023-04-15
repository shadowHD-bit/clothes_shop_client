import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Context } from "../..";
import { getData, updateUserData } from "../../http/userAPI";
import { BsBootstrap, BsGoogle, BsWindowSidebar } from "react-icons/bs";
import NavigationBlockProfile from "../../templates/NavigationBlockProfile/NavigationBlockProfile";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";
import HistoryProduct from "../../templates/HistoryProduct/HistoryProduct";
import useModal from "../../hooks/useModal";
import ChangeAvatarModal from "../../templates/Modal/ProfilePage/ChangeAvatarModal/ChangeAvatarModal";
import useRerender from "../../hooks/useRerender";
import "./UserProfile.scss";

const UserProfile = observer(() => {
  const [changeData, setChangeData] = useState(false);
  const { user } = useContext(Context);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { render, reRender } = useRerender();

  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [date_birthday, setDate_birthday] = useState("");
  const [numberPhone, setNumberPhone] = useState("");

  useEffect(() => {
    setName(user.userProf.name);
    setFamily(user.userProf.family);
    setDate_birthday(user.userProf.date_birthday);
    user.userProf.isVK
      ? setNumberPhone("")
      : setNumberPhone(user.userProf.numberPhone);
  }, []);

  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf({
        ...data,
        avatarFlag: data.avatar.toString().substring(0, 4) == "http",
      });
      setName(user.userProf.firstName);
      setFamily(user.userProf.secondName);
      setDate_birthday(user.userProf.dateBirthday);
      setNumberPhone(user.userProf.numberPhone);
    });
  }, [render]);

  const changeDataUser = () => {
    const formData = new FormData();
    formData.append("firstName", name);
    formData.append("secondName", family);
    formData.append("numberPhone", numberPhone);
    formData.append("dateBirthday", date_birthday);
    updateUserData(user.userProf.id, formData).then((data) => {
      setChangeData(false);
      reRender();
    });
  };

  return (
    <Container fluid="md">
      <Row>
        <p className="title">
          <span className="red">Личный </span> кабинет
        </p>
      </Row>
      <div className="container rounded bg-white profile">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 relative">
              <div className="relative">
                <div
                  className="avatar_profile-lk"
                  style={{
                    backgroundImage: `url(${
                      user.userProf.avatarFlag
                        ? user.userProf.avatar
                        : process.env.REACT_APP_API_URL +
                          "avatars/" +
                          user.userProf.avatar
                    })`,
                  }}
                ></div>
                <Row className="badge_isSocial">
                  <Col className="d-flex flex-row justify-content-center">
                    {user.userProf.isVkAccount ? (
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Регистрация через ВКонтакте.
                          </Tooltip>
                        }
                      >
                        <Badge bg="primary" className="bg_badge">
                          <BsBootstrap size={25} />
                        </Badge>
                      </OverlayTrigger>
                    ) : user.userProf.isGoogleAccount ? (
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Регистрация через Google.
                          </Tooltip>
                        }
                      >
                        <Badge bg="danger" className="bg_badge">
                          <BsGoogle size={25} />
                        </Badge>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Регистрация через SHOP.RU.
                          </Tooltip>
                        }
                      >
                        <Badge bg="secondary" className="bg_badge">
                          <BsWindowSidebar size={25} />
                        </Badge>
                      </OverlayTrigger>
                    )}
                  </Col>
                </Row>
              </div>
              <span className="font-weight-bold mt-2">
                {user.userProf.firstName} {user.userProf.secondName}
              </span>
              <span className="text-black-50"></span>
              <Button
                className="change_photo_btn mt-1"
                onClick={() => handleOpenModal()}
              >
                Изменить аватар
              </Button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Имя</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Фамилия</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    value={family}
                    placeholder="surname"
                    onChange={(e) => setFamily(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Номер телефона</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    placeholder="Номер телефона не указан!"
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Дата рождения</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="date"
                    className="form-control"
                    placeholder="enter address line 1"
                    value={date_birthday}
                    onChange={(e) => setDate_birthday(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Почта</label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={
                      user.userProf.isVK
                        ? "Регистрация через сервис ВКонтакте"
                        : user.userProf.email
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Роль</label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={user.userProf.role}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Дата регистрации</label>
                  <input
                    disabled={true}
                    type="datetime"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={user.userProf.createdAt}
                  />
                </div>
              </div>

              {!changeData ? (
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => setChangeData(true)}
                  >
                    Изменить
                  </button>
                </div>
              ) : (
                <div class="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => changeDataUser()}
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn btn-primary profile-button ml-2"
                    type="button"
                    onClick={() => setChangeData(false)}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <NavigationBlockProfile />
      <HistoryProduct />
      <NavigationBlock />

      {showModal && (
        <ChangeAvatarModal
          show={showModal}
          handleClose={handleCloseModal}
          reRender={reRender}
        />
      )}
    </Container>
  );
});

export default UserProfile;
