const Seat = require("../models/seat.model.js");

exports.findSeatByShowingId = (req, res) => {
    let showingId = req.body.showingId;
    Seat.getSeatByShowingId(showingId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    })
}