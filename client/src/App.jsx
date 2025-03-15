import React from "react"
import Nav from "./components/layout/Nav"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <AppRoutes />
                <Nav />
            </BrowserRouter>
        </>
    )
}

export default App
