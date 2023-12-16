import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    name: null,
    error: null,
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        setVendor: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.error = null;
        },
        setVendorName: (state, action) => {
            state.name = action.payload;
        },
        setVendorToDefault: () => {
            return initialState;
        },
        error: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setVendor, setVendorName, setVendorToDefault, error } = vendorSlice.actions;

export default vendorSlice.reducer;
