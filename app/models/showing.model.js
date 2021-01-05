const sql = require("./db.js");

const Showing = function (showing) {
	this.show_time = showing.showingDatetime;
	this.audio = showing.showingAudio;
}

Showing.findShowingByMovieId = (idList, result) => {
	let showing_id = [];
	sql.query(`select s.id 
			from movie m,showing s,play_in p
			where p.movie_id in (?) 
			and p.showing_id = s.id and m.id = p.movie_id`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		res.forEach((showing) => { showing_id.push(showing.id); });
		result(null, showing_id);
	});
}

Showing.getTime = (movieId, theaterId, result) => {
	//從play_in table裡根據movie_id找出有關這場電影的所有影廳與showing資訊
	sql.query(`SELECT S.id, show_time, T.name theaterName, M.name movieName
				FROM SHOWING S, PLAY_IN P ,THEATER T,MOVIE M
				WHERE 
					P.movie_id = '${movieId}' and 
					P.theater_id = '${theaterId}' and 
					P.showing_id = S.id and
					P.movie_id = M.id and
    				P.theater_id = T.id
				GROUP BY S.id`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}

		console.log("showing time: ", res);
		result(null, res);
	});
};

Showing.create = (newShowing, result) => {
	//新增showing
	sql.query(`INSERT INTO SHOWING SET ? ;`, newShowing, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		result(null, { id: res.insertId, ...newShowing });
	});
};

Showing.getShowingDetail = result => {
	//根據play_id table裡的三個foreignkey找出所有有關showing的資料
	sql.query(`select 
				m.name,
				t.name location,
				s.show_time,
				s.audio,
				s.id showing_id 
			   from 
				movie m,
				showing s,
				play_in p,
				theater t 
			   where 
			    m.id=p.movie_id and
				s.id=p.showing_id and 
				p.theater_id=t.id; `
		, (err, res) => {
			if (err) {
				console.log(err);
				result(null, err);
				return;
			}
			console.log(res);
			result(null, res);
		});
},

Showing.createPlayIn = (movie_id, theater_id, showing_id, result) => {
	//新增showing完後，把跟他有關的影廳與播放的電影連接起來
	newPlayIn = { 'theater_id': theater_id, 'movie_id': movie_id, 'showing_id': showing_id };
	sql.query(`INSERT INTO PLAY_IN SET ?`, newPlayIn, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, newPlayIn);
	});
};

Showing.getDetailShowingByShowingId = (showingId, result) => {
	//根據play_id table裡的showing_id找出播放的影廳與電影資訊
	sql.query(`select 
					movie.name as movieName, 
					movie.name_en as movieNameEn, 
					showing.show_time as showTime, 
					theater.name as theaterName, 
					showing.audio as theaterAudio
				from 
					play_in,movie, 
					theater,showing
				where 
					play_in.theater_id = theater.id and 
					play_in.movie_id = movie.id and 
					showing.id = play_in.showing_id and 
					showing.id = '${showingId}'`, (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
			return;
		}
		console.log(res);
		result(null, res);
	});
};

Showing.deleteShowingAndPlayIn = (idList, result) => {
	//先刪除play_in table裡的foreginkey(showing_id)
	sql.query(`DELETE FROM PLAY_IN WHERE showing_id IN (?);`, [idList], (err, res) => {
		if (err) {
			console.log(err);
			result(null, err);
		}
		//再從showing裡刪資料
		sql.query(`DELETE FROM SHOWING WHERE id IN (?);`, [idList], (err, res) => {
			if (err) {
				console.log(err);
				result(null, err);
				return;
			}
			result(null, res);
		});
	});
};

module.exports = Showing; 