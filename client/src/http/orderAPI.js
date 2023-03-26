import { $authHost, $host } from "./index";

export const sendOrder = async (basket) => {
  const { data } = await $authHost.post("api/orders/create", basket);

  return data;
};

export const fetchOrders = async ({ limit, page, complete }) => {
  const { data } = await $authHost.get(
    `api/orders/get-all?limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

export const fetchOrdersUser = async ({ userId, limit, page, complete }) => {
  const { data } = await $authHost.get(
    `api/orders/get-one-user?userId=${userId}&limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

export const fetchOrderFromStatistic = async () => {
  const { data } = await $authHost.get(
    `api/statistics/count-orders-in-month`
  );
  return data;
};

export const fetchChangeStatusOrder = async ({ complete, id }) => {
  const { data } = await $authHost.put(`api/orders/update-status/${id}`, { isComplete: complete });
  return data;
};

export const fetchDeleteOrder = async ({ id }) => {
  const { data } = await $authHost.delete("api/orders/delete/" + id);
  return data;
};

export const getOneOrderProducts = async (id) => {
  const { data } = await $authHost.get("api/orders/get-one/" + id);
  return data;
};
//order_product_user
export const getAllProductsOneUser = async ({
  userId,
  limit,
  page,
  complete,
}) => {
  const { data } = await $authHost.get(
    `api/orderuser?userId=${userId}&limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

export const toPayment = async (data_payment) => {
  const { data } = await $authHost.post("api/payment/create", data_payment);
  return data;
};