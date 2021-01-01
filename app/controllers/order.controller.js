var moment = require('moment');
const Order = require("../models/order.model.js");

exports.addOrder = (req, res) => {
    let order = JSON.parse(req.body.order);
    let seatList = JSON.parse(req.body.seat);
    let sum = 0;
    let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    for (let i = 0; i < order.length; i++) {
        sum += order[i].qty * order[i].cost;
    }
    const newOrder = new Order({
        price: sum,
        order_time: mysqlTimestamp,
        user_id: req.userId,
    });
    Order.addOrder(newOrder, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}

exports.findOrder = (req, res) => {
    console.log(req.userId);
    Order.getOrder(req.userId, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}