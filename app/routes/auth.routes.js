var express = require("express");
var router = express.Router();
const users = require("../controllers/auth.controller.js");

// Create a new User
router.post("/user/signUp", users.signup);

// Check if user is exist
router.post("/user/usernameCheck", users.checkDuplicateUsername);

// User login
router.post("/user/signIn", users.signin);

// User authentication
router.post("/user/authenticate", users.authenticate);

module.exports = router;
