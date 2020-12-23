var express = require("express");
var router = express.Router();
const playIn = require("../controllers/playIn.controller.js");
const { authJwt } = require("../middleware");

router.post(
    "/playIn/addPlayIn",
    [authJwt.verifyToken, authJwt.isAdmin],
    playIn.addPlayIn,
);

module.exports = router;