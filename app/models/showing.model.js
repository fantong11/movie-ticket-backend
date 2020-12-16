const sql = require("./db.js");

const Showing = function (showing) {
	this.showing_time = theater.showing_time;
}
Showing.getTime = (movieId, theaterId, result) => {
	sql.query(`SELECT id, show_time 
				FROM SHOWING S, PLAY_IN P 
				WHERE 
					movie_id = '${movieId}' and 
					theater_id = '${theaterId}' and 
					P.showing_id = S.id`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
		result(null, res);
	});
};
module.exports = Showing; 