import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: '',
    addressId: ''
}

const locationSlice = createSlice({
    initialState,
    name: 'location',
    reducers: {
        setLocation: (state, action) => {
            state.city = action.payload.city;
            state.addressId = action.payload.addressId
        },
    }
})

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;