import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUserProfile } from "../../features/profileSlice"

const Nav = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )
    const { token } = useSelector((state) => state.auth)

    console.log(token)

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

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
                            <Link to="/posts">Create Post</Link>
                        </li>
                        <li>
                            <Link to="/post">Posts</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
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
