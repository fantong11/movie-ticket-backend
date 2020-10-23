var bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Create a User
	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10), // 密碼進行加密
		active: false, // 預設為未登入
	});

	// Save User in the database
	User.create(user, (err, data) => {
		// 傳data回前端當作錯誤判斷，沒data就回傳錯誤訊息
		if (data){
			res.send(data);
		} else if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Customer."
			});
		}
	});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	User.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving customers."
			});
		else res.send(data);
	});
};

// Find a single Customer with a username
exports.findOneUsername = (req, res) => {
	User.findByUsername(req.body.username, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error retrieving user with username " + req.params.username
			});
		}
		else res.send(data);
	});
};

// Login
exports.signin = (req, res) => {
	User.findByUsernameAndPassword(req.body.username, req.body.password, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error retrieving user with username or password" + req.params.username
			});
		}
		else if (data) {
			// 密碼比對
			var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
			if (!passwordIsValid) {
				res.send({message: "密碼錯誤",});
			}
			else {
				res.send({message: "成功登入",});
			}
		}
	});
};