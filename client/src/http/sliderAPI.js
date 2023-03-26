import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать слайдер
export const createSlider = async (slider) => {
    const {data} = await $authHost.post('api/slides/create', slider)
    return data
}

// Удалить slider
export const deleteSlider = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/slides/delete/'+id});
    return data;
}

// Выбрать slider
export const fetchSlider = async () => {
    const {data} = await $host.get('api/slides/get-all')
    return data
}


// Выбрать один slider
export const fetchOneSlider = async (id) => {
    const {data} = await $host.get('api/slides/get-one/' + id)
    return data
}


// Обновление slider
export const updateSlider = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/slides/update/${id}`, data: body});
    return data;
}

