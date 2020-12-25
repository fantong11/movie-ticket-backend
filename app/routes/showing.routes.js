var express = require("express");
var router = express.Router();
const showings = require("../controllers/showing.controller.js");
const { authJwt } = require("../middleware");

router.get("/showing/movietime", showings.findTime);

router.get("/showing/showingDetail", showings.findDetailShowing);

router.post(
    "/showing/addShowing", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    showings.addShowing,
);

module.exports = router;