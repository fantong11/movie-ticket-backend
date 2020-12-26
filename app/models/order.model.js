const sql = require("./db.js");

const Order = function (movie) {
	this.price = order_list.price;
	this.status = order.status;
	this.deadline = order.deadline;
	this.user_id = order.user_id;
	this.id = order.id;
}
Order.getOrder =(userId, result) => {
    sql.query(`SELECT id,order_time, price FROM order_list where user_id = '${userId}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log(res);
		result(null, res);
	});
};
module.exports = Order;