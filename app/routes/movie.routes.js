var express = require("express");
var router = express.Router();
const movies = require("../controllers/movie.controller.js");

// Find all movies
router.get("/movie/movieList", movies.findAll);

// Find one movie by id
router.get("/movie/movie", movies.findOne);

module.exports = router;