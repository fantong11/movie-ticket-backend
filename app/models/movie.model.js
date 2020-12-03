const sql = require("./db.js");

const Movie = function (movie) {
	this.name = movie.name;
	this.name_en = movie.name_en;
	this.pic_path = movie.pic_path;
	this.description = movie.description;
	this.running_time = movie.running_time;
	this.director = movie.director;
	this.actors = movie.actors;
	this.movie_type = movie.movie_type;
	this.classification = movie.classification;
	this.release_date = movie.release_date;
}

Movie.create = (newMovie, result) => {
	sql.query("INSERT INTO user SET ?", newMovie, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newMovie });
	});
};

Movie.getAll = result => {
	sql.query("SELECT * FROM movie ", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
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

		console.log(res[0]);
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