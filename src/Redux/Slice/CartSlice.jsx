import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items : [],
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state , action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.items.push({
                    ...action.payload,
                     quantity : 1,
                });
            }
        },


             // Increase quantity
        increaseQuantity : (state ,action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if(item){
                item.quantity += 1;
            }
        },
       

        // decrese quantity///


        decreaseQuantity : (state , action) => {
          const item =  state.items.find(
            (item) => item.id === action.payload
          )

          if(item && item.quantity > 1){
            item.quantity -= 1;
          }
        },


        removeFromCart : (state , action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },


        clearCart : (state) => {
             state.items = [];
        },

        
    },
})

export const {addToCart , increaseQuantity , decreaseQuantity , removeFromCart , clearCart} = cartSlice.actions;
export default cartSlice.reducer;