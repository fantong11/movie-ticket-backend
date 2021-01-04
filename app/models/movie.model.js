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
	sql.query(`INSERT INTO MOVIE SET ?`, newMovie, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, { id: res.insertId, ...newMovie });
	});
};

Movie.getAll = result => {
	sql.query(`SELECT * FROM MOVIE `, (err, res) => {
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
	sql.query(`SELECT * FROM MOVIE Where id = '${id}'`, (err, res) => {
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
	sql.query(`SELECT id, name, name_en, pic_path, release_date 
				FROM MOVIE 
				WHERE 
					release_date <= CURDATE()`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Movie.getAllAfterReleaseDate = result => {
	sql.query(`SELECT id, name, name_en, pic_path, release_date 
				FROM MOVIE 
				WHERE 
					release_date > CURDATE()`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Movie.findShowingByMovieId = (idList, result) => {
	let showing_id = [];
	sql.query(`select s.id 
			from movie m,showing s,play_in p
			where p.movie_id in (?) 
			and p.showing_id = s.id and m.id = p.movie_id`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		res.forEach((showing) => { showing_id.push(showing.id); });
		result(null, showing_id);
	});
}

Movie.deletePlayIn = (idList, result) => {
	sql.query(`DELETE FROM play_in WHERE movie_id IN (?)`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		console.log("刪除PLAY_IN成功");
		result(null, res);
	});
	
}

Movie.deleteShowing = (idList, result) => {
	sql.query(`DELETE FROM showing WHERE id IN (?)`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		console.log("刪除Showing成功");
		result(null, res);
	});
}

Movie.deleteMovie = (idList, result) => {
	sql.query(`DELETE FROM MOVIE WHERE id IN (?)`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		console.log("刪除Movie成功");
		result(null, res);
	});
};

module.exports = Movie;