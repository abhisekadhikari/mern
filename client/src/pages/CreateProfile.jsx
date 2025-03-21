import React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useSelector } from "react-redux"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const CreateProfile = () => {
    const userDetails = useSelector((state) => state.auth)
    const navigator = useNavigate()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            experience: [{}],
            education: [{}],
        },
    })

    const { fields: expFields, append: appendExp } = useFieldArray({
        control,
        name: "experience",
    })
    const { fields: eduFields, append: appendEdu } = useFieldArray({
        control,
        name: "education",
    })

    const onSubmit = async (data) => {
        try {
            data.skills = data.skills.split(",").map((skill) => skill.trim())

            const response = await axios.post("/api/user/profile", data, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`,
                },
            })
            console.log("Profile created:", response.data)

            // Success Toast
            toast.success("Profile created", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                onClose: () => navigator("/dashboard"),
            })
        } catch (error) {
            console.error("Error creating profile:", error)
            if (error instanceof AxiosError) {
                console.log(error.response.data?.error)

                for (const err of Object.entries(error.response.data.error)) {
                    console.log(err)
                    toast.error(err[1], {
                        position: "top-right",
                        autoClose: 5000, // Increased time for multiple errors
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    })
                }
            }
        }
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
                {expFields.map((item, index) => (
                    <div className="form-group" key={index}>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register(`experience.${index}.title`, {
                                required: true,
                            })}
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            {...register(`experience.${index}.company`, {
                                required: true,
                            })}
                        />
                        <input
                            type="date"
                            placeholder="From"
                            {...register(`experience.${index}.from`, {
                                required: true,
                            })}
                        />
                        <input
                            type="date"
                            placeholder="To"
                            {...register(`experience.${index}.to`)}
                        />
                        <input
                            type="checkbox"
                            {...register(`experience.${index}.current`)}
                        />
                        Currently Working
                    </div>
                ))}
                <button type="button" onClick={() => appendExp({})}>
                    Add Experience
                </button>

                <h2>Education</h2>
                {eduFields.map((item, index) => (
                    <div className="form-group" key={index}>
                        <input
                            type="text"
                            placeholder="School"
                            {...register(`education.${index}.school`, {
                                required: true,
                            })}
                        />
                        <input
                            type="text"
                            placeholder="Degree"
                            {...register(`education.${index}.degree`, {
                                required: true,
                            })}
                        />
                        <input
                            type="text"
                            placeholder="Field of Study"
                            {...register(`education.${index}.fieldofstudy`, {
                                required: true,
                            })}
                        />
                        <input
                            type="date"
                            placeholder="From"
                            {...register(`education.${index}.from`, {
                                required: true,
                            })}
                        />
                        <input
                            type="date"
                            placeholder="To"
                            {...register(`education.${index}.to`)}
                        />
                        {/* <input
                            type="checkbox"
                            {...register(`education.${index}.current`)}
                        />{" "}
                        Currently Studying */}
                    </div>
                ))}
                <button type="button" onClick={() => appendEdu({})}>
                    Add Education
                </button>
                <br />

                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </section>
    )
}

export default CreateProfile
