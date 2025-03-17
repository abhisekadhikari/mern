import React from "react"
import { useForm } from "react-hook-form"

const CreateProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <select {...register("status", { required: true })}>
                        <option value="">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">
                            Junior Developer
                        </option>
                        <option value="Senior Developer">
                            Senior Developer
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">
                            Student or Learning
                        </option>
                        <option value="Instructor">
                            Instructor or Teacher
                        </option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.status && (
                        <span className="error">Status is required</span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        {...register("skills", { required: true })}
                    />
                    {errors.skills && (
                        <span className="error">Skills are required</span>
                    )}
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        {...register("bio")}
                    />
                </div>

                <h2>Experience</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("experience.title", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        {...register("experience.company", { required: true })}
                    />
                    <input
                        type="date"
                        placeholder="From"
                        {...register("experience.from", { required: true })}
                    />
                    <input
                        type="date"
                        placeholder="To"
                        {...register("experience.to")}
                    />
                    <input
                        type="checkbox"
                        {...register("experience.current")}
                    />{" "}
                    Currently Working
                </div>

                <h2>Education</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="School"
                        {...register("education.school", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        {...register("education.degree", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Field of Study"
                        {...register("education.fieldofstudy", {
                            required: true,
                        })}
                    />
                    <input
                        type="date"
                        placeholder="From"
                        {...register("education.from", { required: true })}
                    />
                    <input
                        type="date"
                        placeholder="To"
                        {...register("education.to")}
                    />
                    <input type="checkbox" {...register("education.current")} />{" "}
                    Currently Studying
                </div>

                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </section>
    )
}

export default CreateProfile
