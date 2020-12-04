const sql = require("./db.js");

const Theater = function (theater) {
	this.name = theater.name;
}

Theater.create = (newTheater, result) => {
	sql.query("INSERT INTO user SET ?", newTheater, (err, res) => {
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

module.exports = Theater;