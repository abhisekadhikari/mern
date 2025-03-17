import { createSlice } from "@reduxjs/toolkit"

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
    try {
        const storedState = localStorage.getItem("authState")
        if (storedState) {
            return JSON.parse(storedState)
        }
        return { isAuthenticated: false, token: null } // Default state
    } catch (error) {
        console.log(error)

        return { isAuthenticated: false, token: null } // Default state if there's an error
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: loadStateFromLocalStorage(),
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload.token
            state.isAuthenticated = action.payload.isAuthenticated
            localStorage.setItem("authState", JSON.stringify(state)) // Save to localStorage
        },
    },
})

export const { loginUser } = authSlice.actions
export default authSlice.reducer
