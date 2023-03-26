import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  email,
  password,
  firstName,
  secondName,
  dateBirthday,
  numberPhone,
  gender,
  allowMailling
) => {
  const { data } = await $host.post("api/auth/registration", {
    email,
    password,
    firstName,
    secondName,
    dateBirthday,
    numberPhone,
    gender,
    allowMailling,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const social_VK_auth = async (
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
) => {
  const { data } = await $host.post("api/auth/social-auth/vk-auth", {
    email,
    password,
    firstName,
    secondName,
    dateBirthday,
    numberPhone,
    gender,
    allowMailling,
    idSocial,
    avatar,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const social_Google_auth = async (
  email,
  password,
  firstName,
  secondName,
  allowMailling,
  idSocial,
  avatar
) => {
  const { data } = await $host.post("api/auth/social-auth/google-auth", {
    email,
    password,
    firstName,
    secondName,
    allowMailling,
    idSocial,
    avatar,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const checkAuth = async () => {
  const { data } = await $authHost.get("api/users/check/check-auth");
  localStorage.setItem("token", data.token);
  console.log(data);
  return jwt_decode(data.token);
};

// /getdatauser

export const getData = async (userID) => {
  const { data } = await $authHost.get(`api/users/${userID}`);
  return data;
};

export const getUserRoleAdminApi = async () => {
  const { data } = await $authHost.get(`api/users/get-all/admins`);
  return data;
};

export const getNewUserApi = async () => {
  const { data } = await $authHost.get(`api/users/get-all/new-users`);
  return data;
};

export const getAllUser = async () => {
  const { data } = await $authHost.get(`api/users/get-all/users`);
  return data;
};

export const getMoneyUserApi = async () => {
  const { data } = await $authHost.get(`api/users/get-all/money-users`);
  return data;
};

export const updateUserData = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/users/update/update-data/${id}`,
    data: body,
  });
  return data;
};

export const updateUserDataAvatar = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/users/update/update-avatar/${id}`,
    data: body,
  });
  return data;
};

export const fetchUserFromStatistic = async () => {
  const { data } = await $authHost.get(
    `api/statistics/count-users-in-month`
  );
  return data;
};


// ResetPassword
export const createForgotPasswordLink = async (user_data) => {
  const { data } = await $authHost.post("api/reset-password/get-letter", user_data);
  return data;
};

export const changePassword = async (user_data) => {
  const { data } = await $authHost.post(
    "api/reset-password/reset",
    user_data
  );
  return data;
};

export const checkResetPasswordToken = async (user_data) => {
  const { data } = await $authHost.post(
    "api/reset-password/check-token",
    user_data
  );
  return data;
};
