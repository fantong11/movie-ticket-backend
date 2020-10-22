var express = require("express")
var router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/signup", users.create);

router.get("/users", users.findAll);

router.post("/checkusername", users.findOneUsername);

router.post("/signin", users.login);

module.exports = router;
