var express = require("express");
var router = express.Router();
const showings = require("../controllers/showing.controller.js");

router.get("/showing/movietime", showings.findTime);
router.get("/showing/", showings.findDetailShowing);

module.exports = router;