import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log("Login Data:", data)
        // Add authentication logic here (e.g., API call)
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
