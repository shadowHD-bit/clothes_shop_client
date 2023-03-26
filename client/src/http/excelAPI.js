import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

// Выбрать товары
export const fetchProductExcel = async () => {
  const { data } = await $authHost.get("api/document/excel/get-products");
  return data;
};

// Выбрать заказы
export const fetchOrderExcel = async ({ complete }) => {
  const { data } = await $authHost.get(`api/document/excel/get-orders?complete=${complete}`);
  return data;
};

// Выбрать бренд
export const fetchBrandExcel = async () => {
  const { data } = await $authHost.get(`api/document/excel/get-brands`);
  return data;
};

// Выбрать тип
export const fetchTypeExcel = async () => {
  const { data } = await $authHost.get(`api/document/excel/get-types`);
  return data;
};

// Выбрать пользователей
export const fetchUserExcel = async () => {
  const { data } = await $authHost.get(`api/document/excel/get-user`);
  return data;
};