import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    admin: null,
    isAuthenticated : false,
}

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState , 
    reducers : {
        
        adminLogin : (state , action) => {
            state.admin = action.payload;
            state.isAuthenticated = true;
        },

        adminLogout : (state) => {
            state.admin = null;
            state.isAuthenticated = false;
        }
    }
})

export const {adminLogin , adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;