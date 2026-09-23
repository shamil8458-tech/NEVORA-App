import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
});


export const getAdminUsers =  async () => {
    const response = await api.get("/users");
    return response.data;
}


export const updateUser = async (user) => {
    const  response = await api.patch(
        `/users/${user.id}`,{
            isBlocked: user.isBlocked
        }
    );

    return response.data;
}