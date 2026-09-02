import axios from 'axios'

const API_URL = "http://localhost:3001/users";

////REGISTER USER////

export const  registerUser = async (userData) => {
    const  response = await axios.post(API_URL , userData);
    return response.data;
}


//GET ALL USERS/////


export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


//FIND USER BY EMAIL//////

export const getUserByEmail = async (email) => {
    const response = await axios.get(`${API_URL}?email=${email}`)
    return response.data
}