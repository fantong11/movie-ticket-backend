var express = require("express");
var router = express.Router();
const movies = require("../controllers/movie.controller.js");

// Find all before and after release_date movie
router.get("/movie/movieList", movies.findAllBeforeOrAfter);

// Find one movie by id
router.get("/movie/movie", movies.findOne);


module.exports = router;