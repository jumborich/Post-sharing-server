const router = require("express").Router();
const authController = require("./../controllers/auth");



router.post("/", authController.createUser);

router.post("/login", authController.login);

module.exports = router;