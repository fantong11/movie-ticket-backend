const sql = require("./db.js");

const User = function (user) {
	this.username = user.username;
	this.password = user.password;
	this.role = user.role;
	// 將來新增的其他屬性
};

User.create = (newUser, result) => {
	sql.query("INSERT INTO USER SET ?", newUser, (err, res) => {
		if (err) {
			// 用error code來判斷是否重複，也許以後需要用到switch case
			if (err.code === "ER_DUP_ENTRY" && err.errno === 1062) {
				result(null, { responseMsg: -1 });
				return;
			}
			console.log(err);
			result(err, null);
			return;
		}

		result(null, { id: res.insertId, ...newUser });
	});
};

User.findByUsername = (username, result) => {
	sql.query(`SELECT * FROM USER WHERE username = '${username}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		// 在user table找不到username就回傳-1
		if (!res.length) {
			console.log(`user ${username} not found`);
			result(1, null);
		} else {
			console.log(`user ${username} found`);
			result(null, res[0]);
		}
	});
};

User.findById = (id, result) => {
	sql.query(`SELECT * FROM USER WHERE id = '${id}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		// 在user table找不到username就回傳-1
		if (!res.length) {
			console.log(`user ${id} not found`);
			result(1, null);
		} else {
			console.log(`user ${id} found`);
			result(null, res[0]);
		}
	});
};

module.exports = User;