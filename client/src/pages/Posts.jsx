import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

const Posts = () => {
    const { token } = useSelector((state) => state.auth)
    const {userProfile} = useSelector((state) => state.profile)
    const [posts, setPosts] = useState([])

    console.log(userProfile.data[0])

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()

    // Fetch all posts once when the component mounts
    useEffect(() => {
        fetchAllPosts()
    }, []) // ✅ Empty dependency array to run only once

    const fetchAllPosts = async () => {
        try {
            const { data } = await axios.get("/api/post", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPosts(data.data) // ✅ Correctly updates state
        } catch (error) {
            toast.error("Failed to fetch posts")
        }
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/post", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            toast.success(response.data.message, { autoClose: 1000 })
            reset()
            fetchAllPosts() // ✅ Fetch latest posts after submission
        } catch (error) {
            toast.error(error.message, { autoClose: 1000 })
        }
    }

    const handleLike = async (postId) => {
        try {

            const { data } = await axios.post(
                `/api/post/${postId}/like`,
                {}, // Empty object for the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(data.message, { autoClose: 1000 })

            fetchAllPosts(); // Refresh the posts list
        } catch (err) {
            toast.error(err.response.data.error, { autoClose: 1000 })
        }
    };

    const handleUnlike = async (postId) => {
        try {

            const { data } = await axios.delete(
                `/api/post/${postId}/unlike`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(data.message, { autoClose: 1000 })

            fetchAllPosts(); // Refresh the posts list
        } catch (err) {
            toast.error(err.response.data.error, { autoClose: 1000 })
        }
    };


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
                                message: "Post must be at least 5 characters long",
                            },
                        })}
                    />
                    {errors.text && (
                        <p style={{ color: "red" }}>{errors.text.message}</p>
                    )}
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>

            <div className="posts">
                {posts.map((post) => (
                    <div className="post bg-white p-1 my-1" key={post._id}>
                        <div>
                            <a href="profile.html">
                                <img
                                    className="round-img"
                                    src={post.user.avatar}
                                    alt=""
                                />
                                <h4>{post.user.name}</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">{post.text}</p>
                            <p className="post-date">Posted on {post.createdAt}</p>
                            <button type="button" onClick={() => handleLike(post._id)} className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i> <span>{post.likes.length}</span>
                            </button>

                            <button type="button" onClick={() => handleUnlike(post._id)} className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>

                            <a href="#" className="btn btn-primary">
                                Discussion <span className="comment-count">2</span>
                            </a>

                            {
                                (userProfile.data[0].user_id === post.user?._id) && (
                                    <button type="button" className="btn btn-danger">
                                        <i className="fas fa-times"></i>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Posts
