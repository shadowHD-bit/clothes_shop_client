import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать ответ
export const createAnswer= async (answer) => {
    const {data} = await $authHost.post('api/answers/create', answer)
    return data
}

// Выбрать один ответ
export const fetchOneAnswer = async (id) => {
    const {data} = await $host.get('api/answers/get-one/' + id)
    return data
}

// Обновить один ответ
export const updateAnswerText = async (id, answer) => {
    const {data} = await $authHost({method:'PUT', url:`api/answers/update/${id}`, data: answer})
    return data
}

