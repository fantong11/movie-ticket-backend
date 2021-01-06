const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
var moment = require('moment');
const Order = require("../models/order.model.js");
const Promocode = require("../models/promocode.model.js");
const Seat = require("../models/seat.model.js");
const OrderProduct = require("../models/orderProduct.model.js");

exports.addOrder = async (req, res) => {
    let sum = 0;
    let orders = JSON.parse(req.body.order);
    let seatList = JSON.parse(req.body.seat);
    let showing_id = parseInt(req.body.showingId);
    let coupon = parseInt(req.body.coupon);
    let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let couponErr = false;
    //同步處理Promocode判斷有沒有使用優惠卷
    if (isNaN(coupon)) {
        sum = convertSum(orders, 0);
        console.log("No code sum: " + sum);
        coupon = null;
    }
    else {
        await Promocode.findCode(coupon).then((data) => {
            if (data.length === 0) {
                couponErr = true;
            }
            let promo = data[0].discount_price;
            sum = convertSum(orders, promo);
        }).catch((err) => {
            couponErr = true;
            
        });
    }
    if (couponErr) return res.send({ message: "Wrong coupon code" });

    const newOrder = new Order({
        price: sum,
        order_time: mysqlTimestamp,
        user_id: req.userId,
        uid: await uidgen.generate(),
        coupon: coupon,
    });

    Order.createOrder(newOrder, (err, data) => {
        // 先新增order_list，等等seat跟order_product需要用到Id
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        console.log(data.insertId);
        let seatSet = createSeatSet(seatList, showing_id, data.insertId);
        Seat.createSeat(seatSet, (seat_err, seat_data) => {
            // 新增座位與訂單id
            if (seat_err) {
                return res.status(500).send({ message: seat_err.message });
            }
            let orderProductSet = createOrderProductSet(orders, data.insertId);
            OrderProduct.createOrderProduct(orderProductSet, (orderProduct_err, orderProduct_data) => {
                // 把訂單與product詳情連起來
                if (orderProduct_err) {
                    return res.status(500).send({ message: orderProduct_err.message });
                }
                res.send({ message: "Add order succeed!" });
            });
        });
    });
}

exports.findOrderSeat = (req, res) => {
    Order.getOrderSeat(req.userId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}
exports.findOrderDrink = (req, res) => {
    Order.getOrderDrink(req.userId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

const convertSum = (order, discount) => {
    // 計算總價格
    let sum = 0;
    for (let i = 0; i < order.length; i++) {
        sum += order[i].qty * order[i].cost;
    }
    sum -= discount;
    return sum;
}

const createOrderProductSet = (orders, orderListId) => {
    // 把資料處理成mysql的輸入格式
    //[{"name":"全票","qty":4,"cost":300},
    // {"name":"優待票","qty":0,"cost":270},
    // {"name":"大可樂","qty":0,"cost":70},
    // {"name":"中可樂","qty":5,"cost":60},
    // {"name":"小可樂","qty":0,"cost":50}]
    let orderProductSet = [];
    orders.forEach(order => {
        if (order.qty !== 0)
            orderProductSet.push([orderListId, order.productId, order.qty]);
    });

    console.log(orderProductSet);
    return orderProductSet;
}

const createSeatSet = (seatList, showing_id, orderListId) => {
    // 把資料處理成mysql的輸入格式
    let seatSet = [];
    seatList.forEach((seat) => {
        seatSet.push([seat, showing_id, orderListId]);
    });
    console.log(seatSet);
    return seatSet;
}