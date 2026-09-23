import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Slice/authSlice'
import cartReducer from '../Slice/CartSlice'
import wishlistReducer from '../Slice/wishlistSlice'


import adminAuthReducer from  "../../admin/redux/slices/adminAuthSlice"
import adminProductReducer from '../../admin/redux/slices/adminProductSlice'
import adminUserReducer from '../../admin/redux/slices/adminUserSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        wishlist : wishlistReducer,

        adminAuth : adminAuthReducer,
        adminProducts : adminProductReducer,
        adminUsers : adminUserReducer,
    }

})
export default store;