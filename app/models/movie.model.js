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
    sql.query("SELECT * FROM movie ", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log("user: ", res);
		result(null, res);
	});
};

Movie.getOne = (id, result) => {
    sql.query(`SELECT * FROM movie Where id = '${id}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log("user: ", res[0]);
		result(null, res[0]);
	});
};
Movie.getAllBeforeReleaseDate = result => {
    sql.query("SELECT id, name, nameEN, picPath, release_date FROM movie WHERE release_date <= CURDATE()", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		
		result(null, res);
	});
};
Movie.getAllAfterReleaseDate = result => {
    sql.query("SELECT id, name, nameEN, picPath, release_date FROM movie WHERE release_date > CURDATE()", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};
module.exports = Movie;