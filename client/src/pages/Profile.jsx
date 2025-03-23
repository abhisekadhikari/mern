import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useSearchParams, useNavigate } from "react-router-dom"

const Profile = () => {
    const [searchParams] = useSearchParams()
    const navigator = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )

    if (userProfile === null) navigator("/create-profile")

    const [otherUserProfile, setOtherUserProfile] = useState(null)
    const [loadingOtherProfile, setLoadingOtherProfile] = useState(false)
    const [fetchError, setFetchError] = useState("")

    useEffect(() => {
        const fetchUserProfileFromParams = async () => {
            const user_id = searchParams.get("user_id")
            if (!user_id) return

            try {
                setLoadingOtherProfile(true)
                setFetchError("")

                const { data } = await axios.get(
                    `/api/user/profile?user_id=${user_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setOtherUserProfile(data.data[0])
            } catch (error) {
                setFetchError("Failed to fetch user profile.")
            } finally {
                setLoadingOtherProfile(false)
            }
        }

        fetchUserProfileFromParams()
    }, [searchParams, token])

    const profile = otherUserProfile || userProfile?.data?.[0]

    if (isLoading || loadingOtherProfile) {
        return <p>Loading profile...</p>
    }

    if (error || fetchError) {
        return <p>Error loading profile: {error || fetchError}</p>
    }

    if (!profile) {
        return <p>No profile found.</p>
    }

    // Access user directly since it's an object, not an array
    const user = profile.user || {}
    const {
        status,
        skills = [],
        bio,
        experience = [],
        education = [],
    } = profile

    return (
        <section className="container">
            <Link to="/profiles" className="btn btn-light">
                Back To Profiles
            </Link>

            <div className="profile-grid my-1">
                {/* Top Section */}
                <div className="profile-top bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={
                            user.avatar ||
                            "https://www.gravatar.com/avatar/?d=identicon"
                        }
                        alt={user.name}
                    />
                    <h1 className="large">{user.name}</h1>
                    <p className="lead">{status}</p>
                    <p>{user.email}</p>
                </div>

                {/* About Section */}
                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{user.name}'s Bio</h2>
                    <p>{bio || "No bio available"}</p>
                    <div className="line"></div>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <div key={index} className="p-1">
                                    <i className="fa fa-check"></i> {skill}
                                </div>
                            ))
                        ) : (
                            <p>No skills listed</p>
                        )}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {experience.length > 0 ? (
                        experience.map((exp) => (
                            <div key={exp._id}>
                                <h3 className="text-dark">{exp.company}</h3>
                                <p>
                                    {new Date(exp.from).toLocaleDateString()} -{" "}
                                    {exp.current
                                        ? "Current"
                                        : new Date(exp.to).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Position: </strong>
                                    {exp.title}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No experience listed</p>
                    )}
                </div>

                {/* Education Section */}
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {education.length > 0 ? (
                        education.map((edu) => (
                            <div key={edu._id}>
                                <h3>{edu.school}</h3>
                                <p>
                                    {new Date(edu.from).toLocaleDateString()} -{" "}
                                    {edu.current
                                        ? "Current"
                                        : new Date(edu.to).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Degree: </strong>
                                    {edu.degree}
                                </p>
                                <p>
                                    <strong>Field of Study: </strong>
                                    {edu.fieldofstudy}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No education listed</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Profile
