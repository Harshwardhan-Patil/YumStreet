import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    vendorId: null,
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.id = action.payload.id;
            state.vendorId = action.payload.vendorId;
            state.cartItems.push(action.payload.cartItems);
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateCartItem: (state, action) => {
            const { itemId, updatedItem } = action.payload;
            const index = state.cartItems.findIndex(item => item.id === itemId);
            if (index !== -1) {
                state.cartItems[index] = { ...state.cartItems[index], ...updatedItem };
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.id = null;
            state.vendorId = null;
            state.cartItems = [];
        }
    },
});

export const { addCart, addCartItem, clearCart, removeCartItem, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
