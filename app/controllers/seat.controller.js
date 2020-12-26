const Seat = require("../models/seat.model.js");

exports.addSeat = (req, res) => {
    //新增哪場showing中被選中的那些座位 ["A1", "A2", "A3"] 
    let seatNameList = req.body.selectedSeat;
    let showingId = req.body.showingId;
    let seatData = "";
    //["A1","A2","A3"] ->  "("A1", 10), ("A2", 10), ("A3", 10)"
    console.log("1. seatNameList: " + req.body.selectedSeat);
    console.log("2. showingId: " + req.body.showingId);
    for (let i = 0; i < seatNameList.length; i++) {
        //整合資料
        seatData = seatData + "(\"" + seatNameList[i] + "\"," + showingId + ")";
        if (i!=seatNameList.length - 1){
            seatData = seatData + ",";
        }
    }
    Seat.addSeat(seatData, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    })
}

exports.findSeatByShowingId = (req, res) => {
    let showingId = req.body.showingId;
    Seat.getSeatByShowingId(showingId, (err, data) => {
        if (err) {
            console.log("FUCK =========== " + err);
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    })
}