const router = require('express').Router();
const postController = require("./../controllers/post");

// Get single post
router.route("/:id").get(postController.getPost);

// index endpoint
router.route("/").get(postController.getAllPosts).post(postController.createPost);

module.exports = router;