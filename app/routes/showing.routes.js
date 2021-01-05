var express = require("express");
var router = express.Router();
const showings = require("../controllers/showing.controller.js");
const { authJwt } = require("../middleware");

router.get("/showing/showingDetail", showings.findDetailShowing);
//從資料庫拿showing table裡的資料

router.get("/showing/showingDetailDelete", showings.getShowingDetail);
//從資料庫根據playIn table拿出所有有關showing的影廳與電影資料

router.get("/showing/movietime", showings.findTime);

router.post(
    "/showing/addShowing", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    showings.addShowing,
);
//從資料庫刪除showing

router.post("/showing/deleteShowing", [authJwt.verifyToken, authJwt.isAdmin],showings.deleteShowing);

module.exports = router;