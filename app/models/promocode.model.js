const sql = require("./db.js");

const Promocode = function (promocode) {
    this.code_number = promocode.code_number;
    this.discount_price = promocode.discount_price;
    this.expiration_time = promocode.expiration_time;
}

Promocode.findCode = (couponNo) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM promo_code where ${couponNo} = code_number`, (err, res) => {
            if (err) {
                reject(err);
                return;
            };
            resolve(res);
        });
    });
}

module.exports = Promocode;