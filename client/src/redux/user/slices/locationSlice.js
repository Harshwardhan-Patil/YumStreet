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
            state.city = action.payload.city.toLowerCase();
            state.addressId = action.payload.addressId
        },
        setLocationToDefault: () => {
            return initialState;
        }
    }
})

export const { setLocation, setLocationToDefault } = locationSlice.actions;
export default locationSlice.reducer;