

import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
});


export const getAdminOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
}

export const updateOrderStatus =  async ( {id , status}) => {
    const response = await api.patch(`/orders/${id}` , {
        status : status
    })

    return response.data;
}