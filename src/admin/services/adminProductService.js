import axios from 'axios'

const api = axios.create({
    baseURL  :"http://localhost:3001"
});

export const getAdminProducts = async () => {
    const response = await api.get("/products")
    return response.data;
}

export const addProduct = async (product) => {
    const response =await api.post("/products" , product);
    return response.data;
}

export const updateProduct = async (product) => {
    const response = await api.put(`/products/${product.id}` , product);
    return response.data;
}


export const deleteProduct = async (id) =>  {
   const response = await api.delete(`/products/${id}`);
   return response.data;
}