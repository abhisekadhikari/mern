import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Nav = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="#">Developers</Link>
                        </li>
                        <li>
                            <Link to="/signup">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Nav
