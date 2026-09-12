import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    items : [],
}

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState,

    reducers : {
        addToWishlist : (state , action) => {
            const existingItem = state.items.find(
                (item) => String(item.productId) === String(action.payload.productId)
            );

            if(!existingItem){
                state.items.push(action.payload)

            }
        },

        setWishlistItems : (state , action) => {
            state.items = action.payload
        },

        removeFromWishlist : (state , action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
})

export const {addToWishlist , setWishlistItems , removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;