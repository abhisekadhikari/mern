import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import userProfileReducer from "../features/profileSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: userProfileReducer,
    },
})
