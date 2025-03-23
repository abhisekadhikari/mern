import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUserProfile } from "../../features/profileSlice"

const Nav = () => {
    const navigator = useNavigate()

    const { isAuthenticated } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )
    // const { token } = useSelector((state) => state.auth)

    console.log(userProfile)

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    // if (!userProfile?.data?.length) return navigator("/create-profile")

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
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                        <li>
                            <Link to="/profiles">Community</Link>
                        </li>
                        <li>
                            <button
                                style={{
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => {
                                    localStorage.removeItem("authState")
                                    navigator("/login")
                                }}
                            >
                                <Link to="/logout">Logout</Link>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
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
