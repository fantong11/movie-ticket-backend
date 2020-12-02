const Movie = require("../models/movie.model");

exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data);
    });
}

exports.findOne = (req, res) => {
    let id = req.query.movieid;
    console.log("movie id = " + id);
    Movie.getOne(id, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}
exports.findAllBeforeOrAfter = (req, res) => {
    let release = req.query.release;
    if(release === "coming"){
        Movie.getAllAfterReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.send(data)
        });
    }
    else if(release === "now"){
        Movie.getAllBeforeReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.send(data)
        });

    }
}