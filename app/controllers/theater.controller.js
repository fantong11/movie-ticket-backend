const Theater = require("../models/theater.model.js");

exports.findAll = (req, res) => {
    Theater.getAll((err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data);
    });
};

exports.findOne = (req, res) => {
    let id = req.query.theaterid;
    Theater.getOne(id, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data);
    });
}

exports.findOneByMovieId = (req, res) => {
    let movieId = req.query.movieid;
    Theater.getOneByMovieId(movieId, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data);
    });
};