import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchUserProfile = createAsyncThunk(
    "profile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const { token } = JSON.parse(localStorage.getItem("authState")) // Retrieve JWT token
            if (!token) return rejectWithValue("No token found")

            const response = await axios.get("/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token in headers
                },
            })

            return response.data // Return user profile data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch profile"
            )
        }
    }
)

const profileSlice = createSlice({
    name: "user profile",
    initialState: {
        userProfile: false,
        error: false,
        isLoading: false,
    },

    reducers: {
        clearProfile: () => {},
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.error = false
                state.userProfile = null
                state.isLoading = true
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.error = false
                state.isLoading = false
                state.userProfile = action.payload
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
