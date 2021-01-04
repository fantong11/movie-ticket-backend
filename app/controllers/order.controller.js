var moment = require('moment');
const Order = require("../models/order.model.js");

exports.addOrder = (req, res) => {
    let order = JSON.parse(req.body.order);
    let seatList = JSON.parse(req.body.seat);
    let showing_id = parseInt(req.body.showingId);
    let sum = convertSum(order);
    let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    const newOrder = new Order({
        price: sum,
        order_time: mysqlTimestamp,
        user_id: req.userId,
    });
    
    Order.addOrder(newOrder, (err, data) => {
        // 先新增order_list，等等seat跟order_product需要用到Id
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        let seatData = convertSeatList(seatList, showing_id, data.insertId);
        Order.addSeat(seatData, (seat_err, seat_data) => {
            // 新增座位與訂單id
            if (seat_err) {
                return res.status(500).send({ message: seat_err.message });
            }
            let orderProductData = convertOrder(order, data.insertId);
            Order.addOrderProduct(orderProductData, (orderProduct_err, orderProduct_data) => {
                // 把訂單與product詳情連起來
                if (orderProduct_err) {
                    return res.status(500).send({ message: seat_err.message });
                }
                res.send(data)
            })
        });
    });
}

exports.findOrder = (req, res) => {
    Order.getOrder(req.userId, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

const convertSeatList = (seatList, showing_id, orderListId) => {
    // 把資料處理成mysql的輸入格式
    let seatData = "";
    for (let i = 0; i < seatList.length; i++) {
        seatData = seatData + "(\"" + seatList[i] + "\"," + showing_id + "," + orderListId + ")";
        if (i != seatList.length - 1) {
            seatData = seatData + ",";
        }
    }
    return seatData;
}

const convertSum = (order) => {
    // 計算總價格
    let sum = 0;
    for (let i = 0; i < order.length; i++) {
        sum += order[i].qty * order[i].cost;
    }
    return sum;
}

const convertOrder = (order, orderListId) => {
    // 把資料處理成mysql的輸入格式
    //[{"name":"全票","qty":4,"cost":300},
    // {"name":"優待票","qty":0,"cost":270},
    // {"name":"大可樂","qty":0,"cost":70},
    // {"name":"中可樂","qty":5,"cost":60},
    // {"name":"小可樂","qty":0,"cost":50}]
    let orderProductData = "";
    let zero_runs = 0;
    // 數量0的個數
    let addCommaTime = order.length - 1;
    // 加","的次數
    for (let i = 0; i < order.length; i++) {
        if (order[i].qty === 0) {
            zero_runs += 1;
        }
    }
    for (let i = 0; i < order.length; i++) {
        if (order[i].qty !== 0) {
            orderProductData = orderProductData + "(" + orderListId + "," + productId(order[i].name) + "," + order[i].qty + ")";
            if (addCommaTime - zero_runs !== 0) {
                orderProductData = orderProductData + ",";
                addCommaTime -= 1;
            }
        }
    }
    // console.log("orderProductData:" + orderProductData)
    return orderProductData;
}

const productId = (product) => {
    // 根據對應的名稱取得id
    switch (product) {
        case "全票":
            return 1;
        case "優待票":
            return 2;
        case "大可樂":
            return 3;
        case "中可樂":
            return 4;
        case "小可樂":
            return 5;
    }
}