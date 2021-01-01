const sql = require("./db.js");

const Order = function (order) {
	this.price = order.price;
	this.order_time = order.order_time;
	this.user_id = order.user_id;
}

Order.addOrder = (newOrder, result) => {
	// 新增order
	console.log()
    sql.query(`INSERT INTO order_list set ?`, newOrder, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        console.log("新增order成功");
        result(null, res);
    });
}

Order.getOrder =(userId, result) => {
    sql.query(`SELECT id,order_time, price FROM order_list where user_id = '${userId}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};
module.exports = Order;