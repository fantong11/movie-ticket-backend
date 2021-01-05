const sql = require("./db.js");

const Order = function (order) {
    this.price = order.price;
    this.order_time = order.order_time;
    this.user_id = order.user_id;
    this.uid = order.uid;
    this.coupon = order.coupon;
}

Order.createOrder = (newOrder, result) => {
    // 新增order
    sql.query(`INSERT INTO order_list set ?`, newOrder, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        console.log("新增order成功");
        console.log(res.insertId);
        result(null, { insertId: res.insertId, ...newOrder });
    });
}

Order.getOrder = (userId, result) => {
    sql.query(`SELECT id, order_time, price FROM order_list where user_id = '${userId}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        result(null, res);
    });
}
Order.getOrderDrink = (userId, result) => {
    sql.query(`SELECT * FROM all_drink where UIDD = '${userId}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        result(null, res);
    });
}
Order.getOrderSeat = (userId, result) => {
    sql.query(`SELECT * FROM all_order_seat where UIDD = '${userId}' ORDER BY Otime DESC`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        result(null, res);
    });
}
module.exports = Order;