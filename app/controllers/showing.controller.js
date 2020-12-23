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

exports.addShowing = (req,res) => {
    const showing = new Showing({
        showing_datetime: req.body.showing_datetime,
        showing_audio: req.body.showing_audio,
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
