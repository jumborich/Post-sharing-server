const router = require("express").Router();
const userController = require("../controllers/Users");

router
.route("/")
.get(userController.getUsers)


// Get a single user
router.get("/:userId", userController.getUser);

module.exports = router;
