const sql = require("./db.js");

const Seat = function (seat) {
    this.showing_id = showing.showing_id;
}

Seat.addSeat = (seatData, result) =>{
    //新增哪場showing中被選中的那些座位 ["A1", "A2", "A3"] 
    console.log("3. seatData:" + seatData);
    sql.query(`INSERT INTO SEAT (seat_row_column, showing_id) VALUES ${seatData};`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        console.log("新增seat成功");
        result(null, res);
    });
}

Seat.getSeatByShowingId = (showing_id, result) => {
    console.log("==================================================" + showing_id);
    sql.query(`Select seat.id, seat.seat_row_column
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