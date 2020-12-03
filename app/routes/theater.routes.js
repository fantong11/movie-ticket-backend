var express = require("express");
var router = express.Router();
const theaters = require("../controllers/theater.controller.js");

router.get("/theater/theaterList", theaters.findAll);

// Find one movie by id
router.get("/theater/theater", theaters.findOne);

module.exports = router;