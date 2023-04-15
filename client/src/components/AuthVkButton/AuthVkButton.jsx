import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { BsBootstrapFill } from "react-icons/bs";
import { Context } from "../..";
import { social_VK_auth } from "../../http/userAPI";
import { SHOP_ROUTE } from "../../utils/consts";
import styled from "./AuthVkButton.module.scss";

export default function AuthVkButton() {
  const {user} = useContext(Context);

  const VKAuthClick = () => {
    window.VK.Auth.login(function (data) {
      if (data.session) {
        window.VK.Api.call(
          "users.get",
          {
            user_ids: data.session.user.id,
            v: "5.131",
            fields: ["photo_100", "sex", "bdate", "email"],
          },
          function (r) {
            let response = r.response[0];
            let user_data = response;
            let gender = null;
            if (user_data.sex == 1) {
              gender = false;
            } else if (user_data.sex == 2) {
              gender = true;
            }
            try {
              let data;
              let email = user_data.id + "@vk.com";
              let password = user_data.id + "vk";
              let firstName = user_data.first_name;
              let secondName = user_data.last_name;
              let dateBirthday = user_data.bdate;
              let numberPhone = user_data.id;
              let allowMailling = false;
              let idSocial = user_data.id + "";
              let avatar = user_data.photo_100;
              data = social_VK_auth(
                email,
                password,
                firstName,
                secondName,
                dateBirthday,
                numberPhone,
                gender,
                allowMailling,
                idSocial,
                avatar
              ).then((data) => {
                user.setUser(user);
                user.setIsAuth(true);
                window.location.href = SHOP_ROUTE;
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    }, 4194308);
  };
  return (
    <>
      <Button className={styled.auth_vk_btn} onClick={() => VKAuthClick()}>
        <BsBootstrapFill /> VKontakte
      </Button>
    </>
  );
}
