import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html">
                    <i className="fas fa-code"></i> DevConnector
                </a>
            </h1>
            <ul>
                <li>
                    <a href="profiles.html">Developers</a>
                </li>
                <li>
                    <Link to="/signup">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
