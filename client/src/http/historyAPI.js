import {$authHost, $host} from "./index";

export const addHistoryView = async (data_history) => {
    const {data} = await $authHost.post('api/history-view-product/add', data_history)
    return data
}

export const getHistoryView = async () => {
    const {data} = await $authHost.get('api/history-view-product/get-all')
    return data
}

