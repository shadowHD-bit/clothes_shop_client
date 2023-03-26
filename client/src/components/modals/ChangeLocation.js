import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";
import { useForm } from "react-hook-form";
import "../../pages/LocationPage/Location.scss";
import {
  createLocationApi,
  fetchOneLocations,
  updateLocation,
} from "../../http/locationAPI";

const ChangeLocation = ({ show, onHide, reRender, item }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchOneLocations(item.id).then((data) => setData(data));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data_form) => {
    try {
      const formData = new FormData();
      formData.append("title", data_form.title);
      formData.append("description", data_form.description);
      formData.append("textAddress", data_form.textAddress);
      formData.append("xCoordination", data_form.xCoordination);
      formData.append("yCoordination", data_form.yCoordination);
      await updateLocation(item.id, formData).then((data) => {
        onHide();
        reRender();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="modal_create_location"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить параметры позиции
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            placeholder={"Введите название позиции"}
            defaultValue={data.title}
            name="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите наименование!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите описание позиции"}
            defaultValue={data.description}
            name="description"
            as="textarea"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите описание!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите текстовый адрес позиции"}
            defaultValue={data.textAddress}
            name="text_address"
            {...register("textAddress", {
              required: true,
            })}
          />
          {errors.textAddress?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите текстовый адрес!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите X координату позиции"}
            defaultValue={data.xCoordination}
            name="xCoordination"
            {...register("xCoordination", {
              required: true,
            })}
          />
          {errors.xCoordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите координату!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите Y координату позиции"}
            defaultValue={data.yCoordination}
            name="y_coordination"
            {...register("yCoordination", {
              required: true,
            })}
          />
          {errors.yCoordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите координату!
              </p>
            </div>
          )}
          <Button type="submit" variant="outline-secondary" className="mt-3">
            Изменить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeLocation;
