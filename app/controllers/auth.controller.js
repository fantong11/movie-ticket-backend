const User = require("../models/user.model.js");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Create and Save a new User
exports.signup = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Create a User
	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10), // 密碼進行加密
		role: "member",
	});

	// Save User in the database
	User.create(user, (err, data) => {
		// 傳data回前端當作錯誤判斷，沒data就回傳錯誤訊息
		if (data) {
			console.log(data);
			return res.send(data);
		} 
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Customer."
		});
	});
};

// Find a single Customer with a username
exports.checkDuplicateUsername = (req, res) => {
	User.findByUsername(req.body.username, (err, data) => {
		if (err) {
			return res.status(500).send({
				message: "Error retrieving user with username " + req.params.username
			});
		}
		res.send(data);
	});
};

// Login
exports.signin = (req, res) => {
	User.findByUsername(req.body.username, (err, data) => {
		if (err) {
			return res.send(404, { message: "User Not found." });
		}
		// 密碼比對
		var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
		if (!passwordIsValid) {
			return res.send(500, {
				accessToken: null,
				message: "Invalid Password!",
			});
		}
		// token只存在24小時
		var token = jwt.sign({ id: data.id, role: data.role }, config.secret, { expiresIn: 86400 });
		res.send({
			id: data.id,
			username: data.username,
			role: data.role,
			accessToken: token
		});
	});
};

// 刷新頁面時驗證token
exports.authenticate = (req, res) => {
	var token = req.body.token;
	if (!token) {
		return res.send(403, { success: false, message: 'No token provided' });
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.send(500, { success: false, message: 'Failed to authenticate token.' });
		} else {
			res.send({
				id: decoded.id,
				success: true,
				message: 'Success to authenticate token.'
			});
		}
	});
};