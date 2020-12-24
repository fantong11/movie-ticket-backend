const sql = require("./db.js");

const PlayIn = function (playIn) {
	this.theater_id = playIn.PlayIn_theaterId;
	this.movie_id = playIn.PlayIn_movieId;
	this.showing_id = playIn.PlayIn_showingId;
}

PlayIn.create = (newPlayIn, result) => {
    sql.query(`INSERT INTO PLAY_IN SET ?`, newPlayIn, (err, res) => {
        if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, { newPlayIn });
    });
};

module.exports = PlayIn; 