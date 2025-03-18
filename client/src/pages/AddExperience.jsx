import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddExperience = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigator = useNavigate()

    const [isCurrent, setIsCurrent] = useState(false)

    const onSubmit = async (data) => {
        console.log(data)

        try {
            const { token } = JSON.parse(localStorage.getItem("authState")) // Retrieve JWT token

            const response = await axios.patch(
                "api/user/profile/experience",
                data, // Send data directly
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in headers
                        "Content-Type": "application/json", // Ensure JSON format
                    },
                }
            )

            console.log("Experience added successfully:", response.data)

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 1000, // Increased time for multiple errors
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                onClose: () => navigator("/dashboard"),
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any
                developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && (
                        <p className="error-text">{errors.title.message}</p>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        {...register("company", {
                            required: "Company is required",
                        })}
                    />
                    {errors.company && (
                        <p className="error-text">{errors.company.message}</p>
                    )}
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        {...register("from", {
                            required: "Start date is required",
                        })}
                    />
                    {errors.from && (
                        <p className="error-text">{errors.from.message}</p>
                    )}
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            {...register("current")}
                            onChange={() => setIsCurrent(!isCurrent)}
                        />{" "}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        {...register("to")}
                        disabled={isCurrent}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        {...register("description")}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">
                    Go Back
                </a>
            </form>
        </section>
    )
}

export default AddExperience
