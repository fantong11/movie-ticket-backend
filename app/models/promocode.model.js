const sql = require("./db.js");

const Promocode = function (promocode) {
	this.code_number = promocode.code_number;
	this.discount_price = promocode.discount_price;
	this.expiration_time = promocode.expiration_time;
}

Promocode.getData = result => {
    sql.query(`SELECT * FROM promo_code`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		result(null, res);
	});
}

module.exports = Promocode;