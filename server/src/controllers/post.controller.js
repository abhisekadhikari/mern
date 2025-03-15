const { validationResult, matchedData } = require("express-validator")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const AppError = require("../utils/AppError")
const Post = require("../models/post.model")

/**
 * @desc   Create a new post
 * @route  POST /post
 * @access Private
 */
const createPost = asyncErrorHandler(async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const data = matchedData(req)

    const newPost = await Post.create(data)

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost,
    })
})

/**
 * @desc   Get all posts
 * @route  GET /post
 * @access Public
 */
const getAllPosts = asyncErrorHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }) // Sorting by latest posts first

    res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: posts,
    })
})

/**
 * @desc   Update a post by ID
 * @route  PUT /post/:id
 * @access Private
 */
const updatePost = asyncErrorHandler(async (req, res) => {
    const { id } = req.params

    const error = validationResult(req).formatWith(({ msg }) => msg)

    if (!error.isEmpty())
        throw new AppError(
            400,
            "Validation failed. Please fix the errors.",
            error.mapped()
        )

    const post = await Post.findById(id)

    if (!post) throw new AppError(404, "Post not found")

    const data = matchedData(req)

    const updatedPost = await Post.findByIdAndUpdate(id, data, {
        new: true, // Returns the updated document
        runValidators: true, // Ensures validators run on update
    })

    res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
    })
})

/**
 * @desc   Delete a post by ID
 * @route  DELETE /post/:id
 * @access Private
 */
const deletePost = asyncErrorHandler(async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id)

    if (!post) throw new AppError(404, "Post not found")

    await post.deleteOne()

    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    })
})

/**
 * @desc   Like a post
 * @route  PUT /post/:id/like
 * @access Private
 */
const likePost = asyncErrorHandler(async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id)

    if (!post) throw new AppError(404, "Post not found", "Invalid post ID")

    const alreadyLiked = post.likes.some(
        (usr) => usr.user.toString() === req.user._id
    )

    if (alreadyLiked)
        throw new AppError(400, "Bad Request", "Post already liked")

    // Add the like
    post.likes.push({ user: req.user._id })
    await post.save()

    res.status(200).json({
        success: true,
        message: "Post liked successfully",
        data: post.likes,
    })
})

/**
 * @desc   Add a comment to a post
 * @route  POST /post/:id/comment
 * @access Private
 */
const commentPost = asyncErrorHandler(async (req, res) => {
    const { id } = req.params
    const { text } = req.body

    // Find the post
    const post = await Post.findById(id)
    if (!post) throw new AppError(404, "Post not found", "Invalid post ID")

    // Ensure the comment text is not empty
    if (!text || text.trim().length === 0)
        throw new AppError(400, "Bad Request", "Comment text cannot be empty")

    // Create the comment object
    const newComment = {
        user: req.user._id,
        text,
        name: req.user.name,
        avatar: req.user.avatar,
        date: new Date(),
    }

    // Add the comment to the post
    post.comments.push(newComment)
    await post.save()

    res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: post.comments,
    })
})

/**
 * @desc   Delete a comment from a post
 * @route  DELETE /post/:id/comment/:commentId
 * @access Private
 */
const deleteComment = asyncErrorHandler(async (req, res) => {
    const { id, commentId } = req.params

    // Find the post
    const post = await Post.findById(id)
    if (!post) throw new AppError(404, "Post not found", "Invalid post ID")

    // Find the comment
    const commentIndex = post.comments.findIndex(
        (comment) => comment._id.toString() === commentId
    )
    if (commentIndex === -1)
        throw new AppError(404, "Comment not found", "Invalid comment ID")

    // Check if the user is the owner of the comment
    if (post.comments[commentIndex].user.toString() !== req.user._id)
        throw new AppError(
            403,
            "Unauthorized",
            "You are not allowed to delete this comment"
        )

    // Remove the comment
    post.comments.splice(commentIndex, 1)
    await post.save()

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
        data: post.comments,
    })
})

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    likePost,
    commentPost,
    deleteComment,
}
