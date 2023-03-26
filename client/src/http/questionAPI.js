import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать вопрос
export const createQuestion= async (question) => {
    const {data} = await $authHost.post('api/questions/create', question)
    return data
}

// Удалить аопрос
export const deleteQuestion = async ({id}) => {
    const {data} = await $authHost.delete('api/questions/delete/'+id);
    return data;
}
// Выбрать вопрос
export const fetchQuestion = async ({limit, page, complete}) => {
    const {data} = await $host.get(`api/questions/get-all?limit=${limit}&page=${page}&complete=${complete}`)
    return data
}

// Выбрать вопросы по товару
export const fetchQuestionProduct = async ({id}) => {
    const {data} = await $host.get('api/questions/get-one-product/' + id)
    return data
}

export const changeStatusQuestion = async ({complete_question, id_question}) => {
    const {data} = await $authHost.put(`api/questions/update-status/${id_question}`, {isComplete: complete_question});
    return data;
}

export const getBoolUserUnCompleteQuestion= async ({userId, productId}) => {
    const {data} = await $authHost.post(`api/questions/check-question-user`, {userId, productId});
    return data;
}