const Movie = require("../models/movie.model");

exports.findAll() = (req, res) => {
    Movie.getAll((err, data) => {
        // 
    });
}