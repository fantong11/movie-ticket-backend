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
    "/order/addOrder",
    [authJwt.verifyToken, authJwt.isMember],
    orders.addOrder
);
// 新增order，先從order_list開始新增再加座位再加product再加order_product

router.post(
    "/user/member",
    [authJwt.verifyToken, authJwt.isMember],
    users.memberBoard
);

router.post(
    "/order/userOrderSeat", 
    [authJwt.verifyToken, authJwt.isMember],
    orders.findOrderSeat
);
router.post(
    "/order/userOrderDrink", 
    [authJwt.verifyToken, authJwt.isMember],
    orders.findOrderDrink
);
module.exports = router;
