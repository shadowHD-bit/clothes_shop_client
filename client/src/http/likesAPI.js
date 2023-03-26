
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Работа с разделом понравившихся товаров
export const addProductToLikes = async (id) => {
    const {data} = await $authHost.post(`api/like/products/add-product/${id}`);
    return data;
}

export const getProductFromLikes = async () => {
    const {data} = await $authHost.get('api/like/products/get-user-like-product');
    return data;
}

export const deleteProductFromLikes = async (id) => {
    const {data} = await $authHost.delete(`api/like/products/delete/${id}`);
    return data;
}
