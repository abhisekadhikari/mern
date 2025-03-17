import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Posts from "../pages/Posts"
import Profiles from "../pages/Profiles"
import ProtectRoutes from "./ProtectRoutes"
import CreateProfile from "../pages/CreateProfile"
import AddExperience from "../pages/AddExperience"
import AddEducation from "../pages/AddEducation"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* <Route
                path="/dashboard"
                element={
                    <ProtectRoutes>
                        <Dashboard />
                    </ProtectRoutes>
                }
            /> */}
            {/* Protected routes */}
            <Route element={<ProtectRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/add-experience" element={<AddExperience />} />
                <Route path="/add-education" element={<AddEducation />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
