import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
});

export const adminLogin = async (adminData) => {

    const  response = await api.get(
        `/users?email=${adminData.email}&password=${adminData.password}&role=admin`
    );

    if(response.data.length === 0){
        throw new Error("Invalid admin email or password")
    }

    return response.data[0]
}