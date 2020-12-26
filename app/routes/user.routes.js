var express = require("express");
var router = express.Router();
const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");
const orders = require("../controllers/order.controller.js");



// Admin 頁面需要的資料
router.post(
    "/user/adminBoard",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
);

// Member 頁面需要的資料
router.post(
    "/user/member",
    [authJwt.verifyToken, authJwt.isMember],
    users.memberBoard
);

router.post(
    "/order/userOrderList", 
    [authJwt.verifyToken, authJwt.isMember],
    orders.findOrder
);
module.exports = router;
