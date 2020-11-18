const sql = require("./db.js");

const User = function (user) {
	this.username = user.username;
	this.password = user.password;
	//this.active = user.active;
	// 將來新增的其他屬性
};

User.create = (newUser, result) => {
	sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
		if (err) {
			// 用error code來判斷是否重複，也許以後需要用到switch case
			if (err.code === "ER_DUP_ENTRY" && err.errno === 1062) {
				//console.log(err);
				result(null, { responseMsg: -1 });
				return;
			}
			console.log(err);
			result(err, null);
			return;
		}

		console.log("created user: ", { id: res.insertId, ...newUser });
		result(null, { id: res.insertId, ...newUser });
	});
};

User.findByUsername = (username, result) => {
	sql.query(`SELECT * FROM user WHERE username = '${username}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		// 在user table找不到username就回傳-1
		if (!res.length) {
			console.log(`user ${username} not found`);
			result(null, { responseMsg: -1 });
		} else {
			console.log(`user ${username} found`);
			result(null, { responseMsg: 1 });
		}
	});
};

User.findByUsernameAndPassword = (username, password, result) => {
	sql.query(`SELECT * FROM user WHERE username = '${username}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		// 在user table找不到username就回傳-1
		console.log(res);
		if (!res.length) {
			console.log("Username not correct.");
			result(1, null);
		} else {
			console.log("Username is correct.");
			result(null, res[0]);
		}
	});
};

User.getAll = result => {
	sql.query("SELECT * FROM customers", (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log("customers: ", res);
		result(null, res);
	});
};

module.exports = User;