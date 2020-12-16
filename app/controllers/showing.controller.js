const Showing = require("../models/showing.model.js");


exports.findTime = (req, res) => {
    let movieId = req.query.movieid;
    let theaterId = req.query.theaterid;
    Showing.getTime(movieId, theaterId, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}