import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать review
export const createReviews = async (reviews) => {
    const {data} = await $authHost.post('api/reviews/create', reviews)
    return data
}

// Выбрать review по товару
export const fetchReviewsProduct = async ({id}) => {
    const {data} = await $host.get('api/reviews/get-one/' + id)
    return data
}

export const deleteReviewsProduct = async (id) => {
    const {data} = await $authHost.delete('api/reviews/delete/' + id)
    return data
}

// Выбрать all review
export const fetchReviews = async () => {
    const {data} = await $host.get('api/reviews/get-all')
    return data
}

export const changeStatus = async (id) => {
    const {data} = await $authHost.put('api/reviews/update/status/'+id)
    return data
}