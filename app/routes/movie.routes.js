var express = require("express");
var router = express.Router();
const movies = require("../controllers/movie.controller.js");
const { authJwt } = require("../middleware");

// Find all before and after release_date movie
router.get("/movie/movieListFake", movies.findAllBeforeOrAfter);
// Find all Movie
router.get("/movie/movieList", movies.findAll);
// Find one movie by id
router.get("/movie/movie", movies.findOne);

router.post(
    "/movie/addMovie", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    movies.addMovie,
);

module.exports = router;