import React from "react"
import { useSelector } from "react-redux"

const Profile = () => {
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )

    if (isLoading) {
        return <p>Loading profile...</p>
    }

    if (error) {
        return <p>Error loading profile: {error}</p>
    }

    if (!userProfile || !userProfile.data || userProfile.data.length === 0) {
        return <p>No profile found.</p>
    }

    const profile = userProfile.data[0]
    const user = profile.user[0]
    const { status, skills, bio, experience, education } = profile

    return (
        <section className="container">
            <a href="/profiles" className="btn btn-light">
                Back To Profiles
            </a>

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
                        {skills.map((skill, index) => (
                            <div key={index} className="p-1">
                                <i className="fa fa-check"></i> {skill}
                            </div>
                        ))}
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
