import {createSlice} from '@reduxjs/toolkit'

const  initialState = {
    users : [],
};

const adminUserSlice = createSlice({
    name : "adminUsers",
    initialState,

    reducers : {
        setUsers : (state , action) => {
            state.users = action.payload;
        },
    },


})


export const {setUsers} = adminUserSlice.actions;
export default adminUserSlice.reducer;