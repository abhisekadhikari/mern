import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "../features/profileSlice"
import { Link } from "react-router-dom"
import moment from "moment"

const Dashboard = () => {
    const dispatch = useDispatch()
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!userProfile?.data?.length)
        return <p>No profile found. Please create one.</p>

    const profile = userProfile.data[0] // Extract first profile object
    const user = profile.user?.[0]

    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user?.name}
            </p>
            <div className="dash-buttons">
                <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> Edit
                    Profile
                </Link>
                <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"></i> Add
                    Experience
                </Link>
                <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"></i> Add
                    Education
                </Link>
            </div>

            {/* Skills Section */}
            <h2 className="my-2">Skills</h2>
            <ul>
                {profile.skills.map((skill, index) => (
                    <li key={index}>✅ {skill}</li>
                ))}
            </ul>

            {/* Experience Section */}
            <h2 className="my-2">Experience Credentials</h2>
            {profile.experience.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {profile.experience.map((exp) => (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td className="hide-sm">
                                    {moment(exp.from).format("YYYY-MM-DD")} -{" "}
                                    {exp.current
                                        ? "Now"
                                        : moment(exp.to).format("YYYY-MM-DD")}
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No experience added.</p>
            )}

            {/* Education Section */}
            <h2 className="my-2">Education Credentials</h2>
            {profile.education.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {profile.education.map((edu) => (
                            <tr key={edu._id}>
                                <td>{edu.school}</td>
                                <td className="hide-sm">{edu.degree}</td>
                                <td className="hide-sm">
                                    {moment(edu.from).format("YYYY-MM-DD")} -{" "}
                                    {edu.current
                                        ? "Now"
                                        : moment(edu.to).format("YYYY-MM-DD")}
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No education added.</p>
            )}

            {/* Delete Account */}
            <div className="my-2">
                <button className="btn btn-danger">
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>
        </section>
    )
}

export default Dashboard
