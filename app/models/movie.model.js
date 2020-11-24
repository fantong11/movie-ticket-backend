const sql = require("./db.js");

const Movie = function (movie) {
    this.title = movie.title;
    this.titleEN = movie.titleEN;
    this.picPath = movie.picPath;
    this.description = moive.description;
    //  還有一堆還沒想到的成員
}

Movie.create = (newMovie, result) => {

}

Movie.getAll = result => {

};

module.exports = Movie;