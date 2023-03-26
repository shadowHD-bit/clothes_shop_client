import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const fetchOneCoupon = async (code) => {
  const { data } = await $host.get(`api/coupons/get-one/${code}`);
  return data;
};

export const fetchCoupons = async () => {
  const { data } = await $host.get(`api/coupons/get-all`);
  return data;
};

export const createCoupon = async (coupon) => {
  const { data } = await $authHost.post(`api/coupons/create`, coupon);
  return data;
};

export const deleteCoupon = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/coupons/delete/" + id,
  });
  return data;
};
