import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Profiles = () => {
    const { token } = useSelector((state) => state.auth)
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsersProfile = async () => {
            try {
                const { data } = await axios.get("/api/user/profile/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProfiles(data.data)
            } catch (err) {
                setError("Failed to fetch profiles.")
            } finally {
                setLoading(false)
            }
        }

        fetchUsersProfile()
    }, [token])

    if (loading) {
        return <p>Loading profiles...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (profiles.length === 0) {
        return <p>No profiles found.</p>
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect
                with developers
            </p>
            <div className="profiles">
                {profiles.map((profile) => {
                    const { _id, name, profile: userProfile } = profile
                    const { status, skills, bio } = userProfile

                    return (
                        <div key={_id} className="profile bg-light">
                            <img
                                className="round-img"
                                src="https://www.gravatar.com/avatar/?d=identicon"
                                alt={name}
                            />
                            <div>
                                <h2>{name}</h2>
                                <p>{status}</p>
                                <p>{bio}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate(`/profile?user_id=${_id}`)
                                    }
                                >
                                    View Profile
                                </button>
                            </div>
                            <ul>
                                {skills.slice(0, 5).map((skill, index) => (
                                    <li key={index} className="text-primary">
                                        <i className="fas fa-check"></i> {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Profiles
