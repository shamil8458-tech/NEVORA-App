import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
})


export const getOrders = async () => {
     
    // unq user find//

    const userId = localStorage.getItem("userId")
    const response = await api.get(`/orders?userId=${userId}`);
    return response.data;
}

export const createOrder = async (order) => {

    // unq user///

    const userId = localStorage.getItem("userId")
    const response = await api.post("/orders" ,{
         ...order,
         userId: userId,
    })
    return response.data;
}