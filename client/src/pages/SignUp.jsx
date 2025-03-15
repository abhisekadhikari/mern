import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { signupRequest } from "../api/Api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            console.log("User Data:", data)
            const response = await signupRequest(data)

            if (!response.data.success) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000, // Increased time for multiple errors
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                })
            }

            // Success Toast
            toast.success("Signup successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            })
        } catch (error) {
            // Error Toast (displays multiple errors properly)
            toast.error(error.message, {
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

    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                        <p className="error">{errors.name.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <small className="form-text">
                        This site uses Gravatar, so use a Gravatar email for a
                        profile image.
                    </small>
                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("password2", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                    />
                    {errors.password2 && (
                        <p className="error">{errors.password2.message}</p>
                    )}
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>

            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    )
}

export default SignUp
