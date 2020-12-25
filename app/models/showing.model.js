const sql = require("./db.js");

const Showing = function (showing) {
	this.show_time = showing.showingDatetime;
	this.audio = showing.showingAudio;
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
	sql.query(`INSERT INTO SHOWING SET ?`, newShowing, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, { id: res.insertId, ...newShowing });
	});
};

Showing.getShowingDetail = result => {
	sql.query(`select m.name,t.name location,s.show_time,
			   s.audio,s.id showing_id from movie m,showing s,
			   play_in p,theater t where m.id=p.movie_id and
				s.id=p.showing_id and p.theater_id=t.id; `, (err, res) => {
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