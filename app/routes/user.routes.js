var express = require("express");
var router = express.Router();
const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");

// Admin 頁面需要的資料
router.post(
    "/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
);

// Member 頁面需要的資料
router.post(
    "/user/member",
    [authJwt.verifyToken, authJwt.isMember],
    users.memberBoard
);

module.exports = router;
