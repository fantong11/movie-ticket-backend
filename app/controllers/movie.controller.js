const Movie = require("../models/movie.model");

exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else res.send(data)
    });
}

exports.findOne = (req, res) => {
    let id = req.query.movieid;
    console.log("movie id = " + id);
    Movie.getOne(id, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else res.send(data)
    });
}