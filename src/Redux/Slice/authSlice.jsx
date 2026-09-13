
import {createSlice} from '@reduxjs/toolkit'

const savedUserId = localStorage.getItem("userId");


const initialState = {
    userId : savedUserId || null,
    isAuthenticated : savedUserId ? true : false
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        Login : (state , action) => {
            state.userId = action.payload.id;
            state.isAuthenticated = true;

            localStorage.setItem("userId" ,action.payload.id);
        },
        Logout : (state) => {
            state.userId = null;
            state.isAuthenticated = false;

            localStorage.removeItem("userId");
        },
    },
})

export const {Login , Logout} = authSlice.actions;
export default authSlice.reducer;