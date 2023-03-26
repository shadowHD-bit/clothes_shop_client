import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const createRules = async (rules) => {
    const {data} = await $authHost.post('api/faq/create', rules)
    return data
}

export const fetchRules = async () => {
    const {data} = await $host.get('api/faq/get-all')
    return data
}

export const fetchOneRules = async (id) => {
    const {data} = await $host.get('api/faq/get-one/'+id)
    return data
}

export const updateRules = async (id, rules) => {
    const {data} = await $authHost({method:'PUT', url:`api/faq/update/${id}`, data: rules})
    return data
}


export const deleteRules = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/faq/delete/'+id});
    return data;
}