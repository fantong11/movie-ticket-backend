const sql = require("./db.js");

const Seat = function (seat) {
    this.showing_id = showing.showing_id;
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