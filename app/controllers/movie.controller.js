const Movie = require("../models/movie.model");

exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else res.send(data)
    });
}