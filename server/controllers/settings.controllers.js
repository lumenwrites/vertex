const settings = require('../../config/settings');

exports.settings = function (req, res, next) {
    return res.send(settings);
}
