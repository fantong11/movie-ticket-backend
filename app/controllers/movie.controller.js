const Movie = require("../models/movie.model");

exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data);
    });
}

exports.findOne = (req, res) => {
    let id = req.query.movieid;
    console.log("movie id = " + id);
    Movie.getOne(id, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
}

exports.findAllBeforeOrAfter = (req, res) => {
    let release = req.query.release;
    if(release === "coming"){
        Movie.getAllAfterReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.send(data)
        });
    }
    else if(release === "now"){
        Movie.getAllBeforeReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.send(data)
        });

    }
}
exports.addMovie = (req,res) => {
    const movie = new Movie({
		name: req.body.name,
        name_en: req.body.name_en,
        pic_path: req.body.pic_path,
        description: req.body.description,
        running_time: req.body.running_time,
        director: req.body.director,
        actors: req.body.actors,
        movie_type: req.body.movie_type,
        classification: req.body.classification,
        release_date: req.body.release_date,

	});
    Movie.create((err, data) => {
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