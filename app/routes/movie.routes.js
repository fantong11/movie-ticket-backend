var express = require("express");
var router = express.Router();
const movies = require("../controllers/movie.controller.js");
const { authJwt } = require("../middleware");

// Find all before and after release_date movie
router.get("/movie/movieList", movies.findAllBeforeOrAfter);

// Find one movie by id
router.get("/movie/movie", movies.findOne);

router.get(
    "/movie/addMovie", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    movies.addMovie
);

module.exports = router;