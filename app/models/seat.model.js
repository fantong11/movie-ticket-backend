const sql = require("./db.js");

const Seat = function (seat) {
    this.seat_row_column = seat.seat_row_column;
    this.showing_id = seat.showing_id;
    this.order_id = seat.order_id;
}

Seat.createSeat = (newSeatSet, result) => {
    // 新增哪場showing中被選中的那些座位 ["A1", "A2", "A3"] 
    // 目前不會呼叫這個，而是透過order那裡直接加
    sql.query("INSERT INTO SEAT (seat_row_column, showing_id, order_id) VALUES ?", [newSeatSet], (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        console.log("新增seat成功");
        result(null, { id: res.insertId, ...newSeatSet });
    });
}

Seat.getSeatByShowingId = (showing_id, result) => {
    sql.query(`Select seat.seat_row_column
                from seat
                where seat.showing_id = '${showing_id}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        console.log(res);
        result(null, res);
    });
}

module.exports = Seat;