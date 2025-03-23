import React, { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useSelector } from "react-redux"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const UpdateProfile = () => {
    const { userProfile, isLoading, error } = useSelector(
        (state) => state.profile
    )

    const { token: userDetails } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            experience: [],
            education: [],
        },
    })

    const {
        fields: expFields,
        append: appendExp,
        replace: replaceExp,
    } = useFieldArray({
        control,
        name: "experience",
    })

    const {
        fields: eduFields,
        append: appendEdu,
        replace: replaceEdu,
    } = useFieldArray({
        control,
        name: "education",
    })

    useEffect(() => {
        if (userProfile) {
            const profileData = userProfile.data[0]
            setValue("status", profileData.status)
            setValue("skills", profileData.skills.join(", "))
            setValue("bio", profileData.bio)

            const formattedExperience =
                profileData.experience?.map((exp) => ({
                    ...exp,
                    from: exp.from
                        ? new Date(exp.from).toISOString().split("T")[0]
                        : "",
                    to: exp.to
                        ? new Date(exp.to).toISOString().split("T")[0]
                        : "",
                })) || []

            const formattedEducation =
                profileData.education?.map((edu) => ({
                    ...edu,
                    from: edu.from
                        ? new Date(edu.from).toISOString().split("T")[0]
                        : "",
                    to: edu.to
                        ? new Date(edu.to).toISOString().split("T")[0]
                        : "",
                })) || []

            replaceExp(formattedExperience)
            replaceEdu(formattedEducation)
        }
    }, [userProfile, setValue, replaceExp, replaceEdu])

    const onSubmit = async (data) => {
        try {
            data.skills = data.skills.split(",").map((skill) => skill.trim())
            await axios.put("/api/user/profile", data, {
                headers: { Authorization: `Bearer ${userDetails}` },
            })
            toast.success("Profile updated successfully!", {
                position: "top-right",
                autoClose: 1000,
            })
            navigate("/dashboard")
        } catch (error) {
            console.error("Error updating profile:", error)
            if (error instanceof AxiosError) {
                toast.error("Error updating profile. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                })
            }
        }
    }

    if (isLoading) return <p>Loading profile...</p>
    if (error) return <p>Error loading profile.</p>

    return (
        <section className="container">
            <h1 className="large text-primary">Update Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Update your profile details
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
                        placeholder="* Skills (comma separated)"
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
                {expFields.map((item, index) => {
                    const isCurrent = watch(`experience.${index}.current`)

                    return (
                        <div className="form-group" key={item.id}>
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
                                {...register(`experience.${index}.from`, {
                                    required: true,
                                })}
                            />
                            <input
                                type="date"
                                {...register(`experience.${index}.to`)}
                                disabled={isCurrent} // Disable if currently working is checked
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    {...register(`experience.${index}.current`)}
                                />
                                Currently Working
                            </label>
                        </div>
                    )
                })}
                <button type="button" onClick={() => appendExp({})}>
                    Add Experience
                </button>

                <h2>Education</h2>
                {eduFields.map((item, index) => {
                    const isCurrentlyStudying = watch(
                        `education.${index}.current`
                    )

                    return (
                        <div className="form-group" key={item.id}>
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
                                {...register(
                                    `education.${index}.fieldofstudy`,
                                    {
                                        required: true,
                                    }
                                )}
                            />
                            <input
                                type="date"
                                {...register(`education.${index}.from`, {
                                    required: true,
                                })}
                            />
                            <input
                                type="date"
                                {...register(`education.${index}.to`)}
                                disabled={isCurrentlyStudying} // Disable if currently studying is checked
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    {...register(`education.${index}.current`)}
                                />
                                Currently Studying
                            </label>
                        </div>
                    )
                })}
                <button type="button" onClick={() => appendEdu({})}>
                    Add Education
                </button>
                <br />
                <input
                    type="submit"
                    className="btn btn-primary my-1"
                    value="Update Profile"
                />
            </form>
        </section>
    )
}

export default UpdateProfile
