var spawner = require('../spawner');

var controller = {};

controller.handle = function (req, res) {
    // Check for base64 images in req
    let base64Images = req.images

    spawner.compute(base64Images, function (results) {
        res.status(200).json(JSON.parse(results));
    });
};