var express = require("express");
var router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/user/signUp", users.create);

router.get("/user/users", users.findAll);

// Check if user is exist
router.post("/user/usernameCheck", users.findOneUsername);

// User login
router.post("/user/signIn", users.signin);

// User authentication
router.post("/user/authenticate", users.authenticate);

module.exports = router;
