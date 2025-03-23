import axios from "axios"
import React, { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

const Post = () => {
    const { token } = useSelector((state) => state.auth)
    const [post, setPost] = useState(null)
    const { postId } = useParams()

    const getPost = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/post/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setPost(data.data)
            toast.success("Post fetched successfully", { autoClose: 1000 })
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to fetch post", {
                autoClose: 1000,
            })
        }
    }, [postId, token])

    useEffect(() => {
        getPost()
    }, [getPost])

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await axios.post(`/api/post/${postId}/comment`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Comment added successfully!", { autoClose: 1000 })
            reset()
            getPost()
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to add comment", {
                autoClose: 1000,
            })
        }
    }

    if (!post) return <p>Loading...</p>

    return (
        <section className="container">
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>

            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile?user_id=${post.user._id}`}>
                        <img
                            className="round-img"
                            src={
                                post.user?.avatar ||
                                "https://www.gravatar.com/avatar/?d=mp"
                            }
                            alt="User Avatar"
                        />
                        <h4>{post.user?.name || "Anonymous"}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{post.text}</p>
                    <p className="post-date">Posted on {post.createdAt}</p>
                </div>
            </div>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        {...register("text", {
                            required: "Comment is required",
                        })}
                    ></textarea>
                    {errors.text && (
                        <p style={{ color: "red" }}>{errors.text.message}</p>
                    )}
                    <input
                        type="submit"
                        className="btn btn-dark my-1"
                        value="Submit"
                    />
                </form>
            </div>

            {post.comments?.map((comment) => {
                return (
                    <div className="comments">
                        <div className="post bg-white p-1 my-1">
                            <div>
                                <Link to={`/profile?user_id=${post.user._id}`}>
                                    <img
                                        className="round-img"
                                        src="https://www.gravatar.com/avatar/?d=mp"
                                        alt=""
                                    />
                                    {/* <h4>John Doe</h4> */}
                                </Link>
                            </div>
                            <div>
                                <p className="my-1">{comment.text}</p>
                                <p className="post-date">
                                    Posted on {comment.date}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* <div className="comments">
                <div className="post bg-white p-1 my-1">
                    <div>
                        <Link to="/profile">
                            <img
                                className="round-img"
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                alt=""
                            />
                            <h4>John Doe</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">Sample comment content...</p>
                        <p className="post-date">Posted on 04/16/2019</p>
                    </div>
                </div>
            </div> */}
        </section>
    )
}

export default Post
