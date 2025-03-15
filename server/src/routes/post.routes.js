const { Router } = require("express")
const {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    likePost,
    // unlikePost,
    commentPost,
    deleteComment,
} = require("../controllers/post.controller")
const postValidatorSchema = require("../validators/post.validator")
const checkAuth = require("../middlewares/checkAuth.middleware")

const postRouter = Router()

/**
 * @route   POST /post
 * @desc    Create a new post
 * @access  Private (Requires authentication)
 * @middleware postValidatorSchema.postValidator - Validates the request payload
 */
postRouter
    .route("/")
    .post(checkAuth, postValidatorSchema.postValidator, createPost)

/**
 * @route   GET /post
 * @desc    Retrieve all posts
 * @access  Public
 */
postRouter.route("/").get(getAllPosts)

/**
 * @route   PUT /post/:id
 * @desc    Update a post by ID
 * @access  Private (Requires authentication)
 * @middleware postValidatorSchema.postValidator - Validates the request payload
 */
postRouter
    .route("/:id")
    .put(checkAuth, postValidatorSchema.postValidator, updatePost)

/**
 * @route   DELETE /post/:id
 * @desc    Delete a post by ID
 * @access  Private (Requires authentication)
 */
postRouter.route("/:id").delete(checkAuth, deletePost)

/**
 * @route   POST /post/:id/like
 * @desc    Like a post
 * @access  Private (Requires authentication)
 */
postRouter.route("/:id/like").post(checkAuth, likePost)

/**
 * @route   DELETE /post/:id/unlike
 * @desc    Unlike a post
 * @access  Private (Requires authentication)
 */
// postRouter.route("/:id/unlike").delete(checkAuth, unlikePost)

/**
 * @route   POST /post/:id/comment
 * @desc    Add a comment to a post
 * @access  Private (Requires authentication)
 */
postRouter.route("/:id/comment").post(checkAuth, commentPost)

/**
 * @route   DELETE /post/:id/comment/:commentId
 * @desc    Delete a comment from a post
 * @access  Private (Requires authentication)
 */
postRouter.route("/:id/comment/:commentId").delete(checkAuth, deleteComment)

module.exports = postRouter
