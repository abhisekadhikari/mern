import axios from "axios"

const apiClient = axios.create({
    baseURL: "/api", // Update with the correct API endpoint
})

export const loginRequest = (data) => apiClient.post("/auth/login", data)

export const signupRequest = (data) => apiClient.post("/auth/signup", data)

export const userProfileRequest = () => apiClient.get("/user/profile")
