import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    isAuth: false,
    role: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.id = action.payload.id
            state.isAuth = action.payload.isAuth
            state.role = action.payload.role
            state.error = null;
        },
        signout: (state, action) => {
            state.id = null
            state.isAuth = false
            state.role = null,
                state.error = null
        },
        authenticationError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { signIn, signout, authenticationError } = authSlice.actions

export default authSlice.reducer;