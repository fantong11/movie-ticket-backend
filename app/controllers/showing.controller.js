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
exports.findDetailShowing = (req, res) => {
    //從資料庫拿showing table裡的資料
    let showingId = req.query.showingid;
    Showing.getDetailShowingByShowingId(showingId, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

exports.getShowingDetail = (req, res) => {
    //從資料庫根據playIn table拿出所有有關showing的影廳與電影資料
    Showing.getShowingDetail((err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    })
}

exports.addShowing = (req,res) => {
    //加入showing
    const showing = new Showing({
        showingDatetime: req.body.showingDatetime,
        showingAudio: req.body.showingAudio,
    });
    let movie_id = req.body.playInMovieId;
    let theater_id = req.body.playInTheaterId;
    let showing_id = '';
    console.log(req.body.playInMovieId,req.body.playInTheaterId);
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

exports.deleteShowing = (req, res) => {
    //從資料庫刪除showing
    console.log(req.body.deleteId);
    let idList = [];
    for (let i = 0; i < req.body.deleteId.length; i++) {
        idList.push(req.body.deleteId[i].id)
    }
    Showing.deleteShowingAndPlayIn(idList, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

