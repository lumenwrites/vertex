const config = require('../config');

exports.about = function (req, res, next) {
    return res.send({
	about:config.about
    });
}
