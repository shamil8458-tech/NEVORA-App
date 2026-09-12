import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Slice/authSlice'
import cartReducer from '../Slice/CartSlice'
import wishlistReducer from '../Slice/wishlistSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        wishlist : wishlistReducer,
    }

})
export default store;