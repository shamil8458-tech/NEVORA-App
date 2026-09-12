import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
})


export const getOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
}

export const createOder = async (order) => {
    const response = await api.post("/orders" , order)
    return response.data;
}