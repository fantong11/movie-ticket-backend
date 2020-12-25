var express = require("express");
var router = express.Router();
const showings = require("../controllers/showing.controller.js");
const { authJwt } = require("../middleware");

router.get("/showing/movietime", showings.findTime);

router.post(
    "/showing/addShowing", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    showings.addShowing,
);
router.get("/showing/showingDetail", showings.findDetailShowing);
router.post("/showing/deleteShowing", showings.deleteShowing);

router.get("/showing/deleteShowingDelete", showings.getShowingDetail);

module.exports = router;