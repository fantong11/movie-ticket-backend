const Showing = require("../models/showing.model.js");


exports.findTime = (req, res) => {
    let movieId = req.query.movieid;
    let theaterId = req.query.theaterid;
    Showing.getTime(movieId, theaterId, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

exports.addShowing = (req, res) => {
    const showing = new Showing({
        showingDatetime: req.body.showingDatetime,
        showingAudio: req.body.showingAudio,
    });
    let movie_id = req.body.playInMovieId;
    let theater_id = req.body.playInTheaterId;
    let showing_id = '';
    Showing.create(showing, (err, data) => {
        // 傳data回前端當作錯誤判斷，沒data就回傳錯誤訊息
        if (data) {
            console.log('new showing ' + data.id);
            showing_id = data.id;
            Showing.createPlayIn(movie_id, theater_id, showing_id, (err, data) => {
                if (data) {
                    console.log('add new playIn success');
                }
                if (err) {
                    return res.status(500).send({ message: err.message });
                }
            });
            return res.send(data);
        }
    });
}
