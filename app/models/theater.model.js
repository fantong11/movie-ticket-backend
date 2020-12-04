const sql = require("./db.js");

const Theater = function (theater) {
	this.name = theater.name;
}

Theater.create = (newTheater, result) => {
	sql.query("INSERT INTO THEATER SET ?", newTheater, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newTheater });
	});
};

Theater.getAll = result => {
	sql.query("SELECT * FROM THEATER", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
		result(null, res);
	});
};

Theater.getOne = (id, result) => {
	sql.query(`SELECT * FROM THEATER WHERE id = '${id}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res[0]);
		result(null, res[0]);
	});
};

// 用movieId去找對應的theater
Theater.getOneByMovieId = (movieId, result) => {
	sql.query(`SELECT id, name 
				FROM PLAY_IN, THEATER 
				WHERE 
					PLAY_IN.movie_id = ${movieId}
					AND PLAY_IN.theater_id = THEATER.id 
				GROUP BY THEATER.id;`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
		result(null, res);
	});
}

module.exports = Theater;