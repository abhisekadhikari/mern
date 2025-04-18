import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "../features/profileSlice"
import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import axios from "axios"
import { toast } from "react-toastify"

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )
    const { token } = useSelector((state) => state.auth)

    console.log(token)

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    console.log(userProfile)

    if (!userProfile?.data?.length) return navigator("/create-profile")
    // return <p>No profile found. Please create one.</p>

    const profile = userProfile.data[0] // Extract first profile object
    const user = profile.user?.[0]

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `/api/user/profile/experience/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(response.data)

            toast.success("Experience deleated", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            })

            dispatch(fetchUserProfile()) // Refetch the profile after deletion
        } catch (error) {
            toast.success(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            })
        }
    }

    const handleDeleteEducation = async (id) => {
        try {
            await axios.delete(`/api/user/profile/education/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success("Education deleted", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            })

            dispatch(fetchUserProfile())
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            })
        }
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user?.name}
            </p>
            <div className="dash-buttons">
                <Link to="/update-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> Edit
                    Profile
                </Link>
                <Link to="/update-profile" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"></i> Add
                    Experience
                </Link>
                <Link to="/update-profile" className="btn btn-light">
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(exp._id)}
                                    >
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDeleteEducation(edu._id)
                                        }
                                    >
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
