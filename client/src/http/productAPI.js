import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

//Создать тип
export const createType = async (type) => {
  const { data } = await $authHost.post("api/types/create", type);
  return data;
};

// Удалить тип
export const deleteType = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/types/delete/" + id,
  });
  return data;
};

// Выбрать тип
export const fetchTypes = async () => {
  const { data } = await $host.get("api/types/get-all");
  return data;
};

// Создать бренд
export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brands/create", brand);
  return data;
};

// Выбрать бренд
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brands/get-all");
  return data;
};

// Удалить бренд
export const deleteBrand = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/brands/delete/" + id,
  });
  return data;
};

// Update бренд
export const updateBrand = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/brands/update/${id}`,
    data: body,
  });
  return data;
};

// Update type
export const updateType = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/types/update/${id}`,
    data: body,
  });
  return data;
};

// Создать товар
export const createProduct = async (product) => {
  const { data } = await $authHost.post("api/products/create", product);
  return data;
};

// Создать товар excel
export const createMoreProduct = async (products) => {
  const { data } = await $authHost.post(
    "api/products/create/more-product",
    products
  );
  return data;
};

// Выбрать товар
export const fetchProduct = async (productTypeId, productBrandId) => {
  const { data } = await $host.get("api/products/get-all", {
    params: {
      productTypeId,
      productBrandId,
    },
  });
  return data;
};

// Выбрать товар
export const fetchProductsForAdmin = async () => {
  const { data } = await $authHost.get(`api/products/for-admin/get-all`);
  return data;
};

// Выбрать популярные товары
export const fetchPopularProduct = async () => {
  const { data } = await $host.get(`api/products/get-popular`);
  return data;
};

// Выбрать последнии товары
export const fetchLastProduct = async () => {
  const { data } = await $host.get(`api/products/get-last`);
  return data;
};

// Выбрать один продукт
export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("api/products/get-one/" + id);
  return data;
};

// Удалить один продукт
export const fetchDeleteProduct = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: `api/products/delete/${id}`,
  });
  return data;
};

// Обновление товара
export const updateProduct = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/products/update/${id}`,
    data: body,
  });
  return data;
};

// Обновление отображения
export const updateDisplayProduct = async ({ isDisplay, id }) => {
  const { data } = await $authHost.put("api/products/update-display", {
    isDisplay,
    id,
  });
  return data;
};

//Работа с корзиной
export const addProductToBasket = async (product) => {
  const { data } = await $authHost.post(
    "api/basket/products/add-product",
    product
  );
  return data;
};

//Работа с корзиной
export const changeCountProductBasket = async (data_action) => {
  const { data } = await $authHost.post(
    "api/basket/products/change-count",
    data_action
  );
  return data;
};

export const getProductFromBasket = async () => {
  const { data } = await $authHost.get(
    "api/basket/products/get-user-basket-product"
  );
  return data;
};

export const deleteProductFromBasket = async (formdata) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: `api/basket/products/delete`,
    data: formdata,
  });
  return data;
};

//Поиск товара
export const getAllProductSearch = async (name) => {
  const { data } = await $host({
    method: "GET",
    url: `api/products/search-by-name/${name}`,
  });
  return data;
};

// Удалить бренд
export const deleteInfo = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/products/params/delete/" + id,
  });
  return data;
};

//Создать размер
export const createSize = async (size) => {
  const { data } = await $authHost.post("api/sizes/create", size);
  return data;
};

export const updateCountSize = async (sizeData) => {
  const { data } = await $authHost.put("api/sizes/update/count", sizeData);
  return data;
};

export const fetchSizes = async () => {
  const { data } = await $host.get("api/sizes/get-all");
  return data;
};

export const fetchSizesOneProduct = async (id) => {
  const { data } = await $host.get("api/sizes/product/get-all/" + id);
  return data;
};

export const deleteSizeApi = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/sizes/delete/" + id,
  });
  return data;
};

export const createProductSize = async (size) => {
  const { data } = await $authHost.post("api/sizes/product/create", size);
  return data;
};

export const deleteProductSizeApi = async (size) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/sizes/product/delete",
    data: size,
  });
  return data;
};

export const createBadge = async (size) => {
  const { data } = await $authHost.post("api/product-badge/create", size);
  return data;
};

export const fetchBadge = async () => {
  const { data } = await $host.get("api/product-badge/get-all");
  return data;
};

export const deleteBadge = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/product-badge/delete/" + id,
  });
  return data;
};
