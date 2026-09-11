import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Slice/authSlice'
import cartReducer from '../Slice/CartSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
    }

})
export default store;