import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes
