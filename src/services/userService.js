import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
})

  

export const registerUser = async (userData) => {
    const  existingUser = await api.get(
        `/users?email=${userData.email}`
    );

    if(existingUser.data.length > 0){
        throw new Error("Email already registered!")
    }

    const  response = await api.post("/users", {
        name : userData.name,
        email : userData.email,
        password : userData.password,
    });
    return response.data
}


export const loginUser = async (userData) => {
    const response = await api.get(
        `/users?email=${userData.email}&password=${userData.password}`
    );

    if(response.data.length === 0){
        throw new Error("Invalid email or password!");
    }

    return response.data[0]
}