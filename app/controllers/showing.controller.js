const Showing = require("../models/showing.model.js");

exports.findTime = (req, res) => {
    let movieId = req.query.movieid;
    let theaterId = req.query.theaterid;
    Showing.getTime(movieId, theaterId, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}

exports.findDetailShowing = (req,res) => {
    let showingId = req.query.showingid;
    Showing.getDetailShowing(showingId, (err, data) => {
		if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}

exports.addShowing = (req,res) => {
    const showing = new Showing({
		movie: req.body.movie,
        theater: req.body.theater,
        showing_date: req.body.showing_date,
        showing_time: req.body.showing_time,
	});
    Showing.create(showing, (err, data) => {
		// 傳data回前端當作錯誤判斷，沒data就回傳錯誤訊息
		if (data) {
			console.log(data);
			return res.send(data);
		} 
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Movie."
		});
	});
}

