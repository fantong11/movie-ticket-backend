const sql = require("./db.js");

const PlayIn = function (playIn) {
	this.name = playIn.name;
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