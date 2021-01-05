const Movie = require("../models/movie.model");
const Showing = require("../models/showing.model");

exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data);
    });
}

exports.findOne = (req, res) => {
    let id = req.query.movieid;
    console.log("movie id = " + id);
    Movie.getOne(id, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(data)
    });
}

exports.findAllBeforeOrAfter = (req, res) => {
    let release = req.query.release;
    if (release === "coming") {
        Movie.getAllAfterReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.send(data)
        });
    }
    else if (release === "now") {
        Movie.getAllBeforeReleaseDate((err, data) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.send(data)
        });
    }
    else if (release === "all") {
        Movie.getAll((err, data) => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.send(data);
        });
    }
}

exports.addMovie = (req, res) => {
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
    Movie.create(movie, (err, data) => {
        // 傳data回前端當作錯誤判斷，沒data就回傳錯誤訊息
        if (data) {
            console.log("movie: ", data);
            return res.send(data);
        }
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Movie."
        });
    });
}
exports.deleteMovie = (req, res) => {
    console.log("delete_id: ",req.body.deleteId);
    let idList = [];
    let showing_id = [];
    for (let i = 0; i < req.body.deleteId.length; i++) {
        idList.push(req.body.deleteId[i].id)
    }
    console.log(idList);
    Showing.findShowingByMovieId(idList, (err_1, data_1) => {
        if (err_1) {
            return res.status(500).send({ message: err_1.message });
        }
        Movie.deletePlayIn(idList, (err_2, data_2) => {
            if (err_2) {
                return res.status(500).send({ message: err_2.message });
            }
            Movie.deleteShowing(data_1, (err_3, data_3) => {
                if (err_3) {
                    return res.status(500).send({ message: err_3.message });
                }
                Movie.deleteMovie(idList, (err, data) => {
                    if (err) {
                        return res.status(500).send({ message: err.message });
                    }
                    res.send(data)
                });
            })
            
        })
        
    })
    
}