import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

const Posts = () => {
    const { token } = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([])

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "api/post",
                data, // Send data directly
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in headers
                        "Content-Type": "application/json", // Ensure JSON format
                    },
                }
            )

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 1000, // Increased time for multiple errors
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                // onClose: () => navigator("/dashboard"),
            })
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 1000, // Increased time for multiple errors
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                // onClose: () => navigator("/dashboard"),
            })
        }
    }

    const fetchAllPosts = async () => {
        const { data } = await axios.get("/api/post", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        setPosts(data.data)
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <section className="container">
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community!
            </p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        {...register("text", {
                            required: "Post content is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Post must be at least 5 characters long",
                            },
                        })}
                    />
                    {errors.text && (
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {errors.text.message}
                        </p>
                    )}

                    <input
                        type="submit"
                        className="btn btn-dark my-1"
                        value="Submit"
                    />
                </form>
            </div>

            <div className="posts">
                {posts.map((post) => {
                    return (
                        <div className="post bg-white p-1 my-1" key={post._id}>
                            <div>
                                <a href="profile.html">
                                    <img
                                        className="round-img"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                        alt=""
                                    />
                                    <h4>{post._id}</h4>
                                </a>
                            </div>
                            <div>
                                <p className="my-1">{post.text}</p>
                                <p className="post-date">
                                    Posted on {post.createdAt}
                                </p>
                                <button type="button" className="btn btn-light">
                                    <i className="fas fa-thumbs-up"></i>
                                    <span>4</span>
                                </button>
                                <button type="button" className="btn btn-light">
                                    <i className="fas fa-thumbs-down"></i>
                                </button>
                                <a href="post.html" className="btn btn-primary">
                                    Discussion{" "}
                                    <span className="comment-count">2</span>
                                </a>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Posts
