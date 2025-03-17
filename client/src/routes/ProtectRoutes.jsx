import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectRoutes
