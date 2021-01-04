const sql = require("./db.js");

const OrderProduct = function (orderProduct) {
    this.order_list = orderProduct.order_list,
    this.product_id = orderProduct.product_id
}

OrderProduct.createOrderProduct = (newOrderProductSet, result) => {
	// 此為order_list和product的關聯，透過order_id對應到那筆訂單得購買詳情
	// (order_list_id為order_list的foreign key, product_id為product的foreign key, amount)
	// console.log("orderProductData" + orderProductData);
	sql.query("INSERT INTO order_product (order_list_id, product_id, amount) VALUES ?", [newOrderProductSet], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        };
        console.log("新增orderProduct成功");
        result(null, { id: res.insertId, ...newOrderProductSet });
    });
}

module.exports = OrderProduct;