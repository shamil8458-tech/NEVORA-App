import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    orders : [],
}

const adminOrderSlice = createSlice({
    name : "adminOrders",

    initialState,

    reducers : {
        setOrders : (state , action) => {
            state.orders = action.payload;
        },
    },
})
export const {setOrders} = adminOrderSlice.actions;
export default adminOrderSlice.reducer