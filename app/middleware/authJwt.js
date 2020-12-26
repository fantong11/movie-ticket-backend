const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// 執行user動作前，先驗證token
verifyToken = (req, res, next) => {
    let token = req.body.token;
    if (!token) {
        return res.status(403).send({
            success: false, message: 'No token provided'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                success: false, message: 'Failed to authenticate token.'
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, data) => {
        if (data.role === "admin") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
}

isMember = (req, res, next) => {
    User.findById(req.userId, (err, data) => {
        if (data.role === "member") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Member Role!"
        });
        return;
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isMember: isMember,
};
module.exports = authJwt;