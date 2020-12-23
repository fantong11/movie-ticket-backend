const PlayIn = require("../models/playIn.model.js");

exports.addPlayIn = (req, res) => {
    const playIn = new PlayIn({
        playIn_theaterId: req.body.playIn_theaterId,
        playIn_movieId: req.body.playIn_movieId,
        playIn_showingId: req.body.playIn_showingId
    });
    PlayIn.create(playIn, (err, data) => {
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