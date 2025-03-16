import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = action.payload.isAuthenticated
        },
    },
})

export const { loginUser } = authSlice.actions
export default authSlice.reducer
