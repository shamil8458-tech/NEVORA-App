import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
})



export const getDashboardProducts = async () => {

    const  response = await api.get("/products")
    return response.data;
}


export const getDashboardUsers = async () => {

    const response = await api.get("/users")
    return response.data;
}


export const getDashboardOrders = async () => {

    const response = await api.get("/orders")
    return response.data;
}