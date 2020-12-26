var express = require("express");
var router = express.Router();
const seats = require("../controllers/seat.controller.js");

router.post("/seat/fetchSeatByShowingId", seats.findSeatByShowingId);

router.post("/seat/addSeat", seats.addSeat);
//新增哪場showing中被選中的那些座位，傳入資料格式為{"selectedSeat": ["A1","A2","A3"],"showingId": 48}

module.exports = router;