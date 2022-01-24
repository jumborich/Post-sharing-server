const router = require("express").Router();
const commentController = require("../controllers/comments");



// Get All comments AND // Create a comment;
router
.route("/")
.post(commentController.createComment);

router.get("/:postId",commentController.getComments)

module.exports = router;