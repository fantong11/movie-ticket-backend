const sql = require("./db.js");

const Showing = function (showing) {
	this.showing_time = theater.showing_time;
}
Showing.getTime = (movieId, theaterId, result) => {
	sql.query(`SELECT S.id, show_time, T.name theaterName, M.name movieName
				FROM SHOWING S, PLAY_IN P ,THEATER T,MOVIE M
				WHERE 
					P.movie_id = '${movieId}' and 
					P.theater_id = '${theaterId}' and 
					P.showing_id = S.id and
					P.movie_id = M.id and
    				P.theater_id = T.id
				GROUP BY S.id`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
		result(null, res);
	});
};

Showing.create = (newShowing, result) => {
	sql.query(`INSERT INTO MOVIE SET ?`, newShowing, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, { id: res.insertId, ...newShowing });
	});
};

module.exports = Showing; 