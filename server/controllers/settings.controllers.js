const settings = require('../settings');

exports.about = function (req, res, next) {
    return res.send(settings);
}
