import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Context } from "../..";
import { social_Google_auth } from "../../http/userAPI";
import { SHOP_ROUTE } from "../../utils/consts";
import styled from './AuthGoogleButton.module.scss'

export default function AuthGoogleButton() {
  const {user} = useContext(Context)

  const GoogleAuthClick = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn({ prompt: "consent" }).then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      try {
        let email = profile.getEmail();
        let password = profile.getId() + "google";
        let firstName = profile.getGivenName();
        let secondName = profile.getFamilyName();
        let allowMailling = false;
        let idSocial = profile.getId() + "";
        let avatar = profile.getImageUrl();

        let data = social_Google_auth(
          email,
          password,
          firstName,
          secondName,
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
    });
  };

  return (
    <>
      <Button className={styled.auth_google_btn} onClick={() => GoogleAuthClick()}>
        <AiFillGoogleCircle /> Google
      </Button>
    </>
  );
}
