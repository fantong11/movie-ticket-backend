var express = require("express")
var router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/user/signUp", users.create);

router.get("/user/users", users.findAll);

router.post("/user/usernameCheck", users.findOneUsername);

router.post("/user/signIn", users.signin);

module.exports = router;
