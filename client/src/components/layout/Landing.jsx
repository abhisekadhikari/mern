import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Landing = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and
                        get help from other developers
                    </p>

                    <div className="buttons">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="btn btn-primary">
                                    Profile
                                </Link>
                                <Link to="/dashboard" className="btn btn-light">
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" className="btn btn-primary">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-light">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
