var moment = require('moment');
const Order = require("../models/order.model.js");
const Promocode = require("../models/promocode.model.js");

exports.addOrder = async (req, res) => {
    let sum = 0;
    let order = JSON.parse(req.body.order);
    let seatList = JSON.parse(req.body.seat);
    let showing_id = parseInt(req.body.showingId);
    let coupon = parseInt(req.body.coupon);
    let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    //同步處理Promocode判斷有沒有使用優惠卷
    await Promocode.getData(coupon).then((data) => {
        if (data.length === 0) {
            sum = convertSum(order, 0);
            return res.status(500).send({ message: err.message });
        }
        let promo = data[0].discount_price;
        sum = convertSum(order, promo);
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    });

    const newOrder = new Order({
        price: sum,
        order_time: mysqlTimestamp,
        user_id: req.userId,
        // coupon: coupon,
    });

    // 同步處理 先處理完order_list，再處理Seat，再處理OrderProduct
    let orderForeignKey;
    await Order.addOrder(newOrder).then((data) => {
        // 先新增order_list，等等seat跟order_product需要用到Id
        orderForeignKey = data.insertId;
        console.log(orderForeignKey);
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    });

    let seatData = await convertSeatList(seatList, showing_id, orderForeignKey);
    await Order.addSeat(seatData).then((data) => {
        console.log(data);
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    });

    let orderProductData = await convertOrder(order, orderForeignKey);
    await Order.addOrderProduct(orderProductData).then((data) => {
        // 把訂單與product詳情連起來
        res.send({ message: "Add order succeed!" });
        console.log(data);
    }).catch((err) => {
        console.log(err);
        res.status(503).send({ message: err.message });
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

const convertSum = (order, discount) => {
    // 計算總價格
    let sum = 0;
    for (let i = 0; i < order.length; i++) {
        sum += order[i].qty * order[i].cost;
    }
    sum -= discount;
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