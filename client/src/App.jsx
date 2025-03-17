import { BrowserRouter } from "react-router-dom"
import Nav from "./components/layout/Nav"
import AppRoutes from "./routes/AppRoutes"
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
