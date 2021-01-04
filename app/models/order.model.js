const sql = require("./db.js");

const Order = function (order) {
	this.price = order.price;
	this.order_time = order.order_time;
	this.user_id = order.user_id;
}

Order.addOrderProduct = (orderProductData, result) => {
	// 此為order_list和product的關聯，透過order_id對應到那筆訂單得購買詳情
	// (order_list_id為order_list的foreign key, product_id為product的foreign key, amount)
	// console.log("orderProductData" + orderProductData);
	sql.query(`INSERT INTO order_product VALUES ${orderProductData};`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        };
        console.log("新增orderProduct成功");
        result(null, res);
    });
}

Order.addSeat = (seatData, result) => {
	// 新增哪場showing中被選中的那些座位 ["A1", "A2", "A3"] 
	// console.log("seatData:" + seatData);
	sql.query(`INSERT INTO SEAT (seat_row_column, showing_id, order_id) VALUES ${seatData};`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        console.log("新增seat成功");
        result(null, res);
    });
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