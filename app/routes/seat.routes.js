var express = require("express");
var router = express.Router();
const seats = require("../controllers/seat.controller.js");

router.post("/seat/fetchSeatByShowingId", seats.findSeatByShowingId);

module.exports = router;