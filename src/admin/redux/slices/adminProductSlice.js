import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products : [],
}

const adminProductSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers : {
        setProducts : (state , action) => {
            state.products = action.payload;
        },
    },
})

export const {setProducts} = adminProductSlice.actions;
export default adminProductSlice.reducer;