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

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
}
