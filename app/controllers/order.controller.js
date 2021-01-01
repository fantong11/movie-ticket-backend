const Showing = require("../models/order.model.js");
exports.findOrder = (req, res) => {
    console.log(req.userId);
    Showing.getOrder(req.userId, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        res.send(data)
    });
    
}