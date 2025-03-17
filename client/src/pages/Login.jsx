import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { loginRequest } from "../api/Api"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { loginUser } from "../features/authSlice"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigator = useNavigate()

    const dispacher = useDispatch()

    const onSubmit = async (data) => {
        try {
            console.log("Login Data:", data)

            const response = await loginRequest(data)

            console.log(response.data)

            dispacher(
                loginUser({
                    token: response.data.token,
                    isAuthenticated: true,
                })
            )

            localStorage.setItem("_userToken", response.data.token)

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 1000, // Increased time for multiple errors
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                onClose: () => {
                    navigator("/dashboard")
                },
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response.data.error, {
                    position: "top-right",
                    autoClose: 5000, // Increased time for multiple errors
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                })
            }

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
            {/* Remove this alert unless dynamically controlled */}
            {/* <div className="alert alert-danger">Invalid credentials</div> */}

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into Your Account
            </p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </section>
    )
}

export default Login
