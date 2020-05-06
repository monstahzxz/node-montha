var spawner = require('../spawner');
var fs = require('fs');
var path = require('path');
var config = require('../config/general-config');
var request = require('request-promise');

var controller = {};

controller.workingDir = config.py.workingDir;
controller.reqOptions = config.py.reqOptions;

if (!fs.existsSync(controller.workingDir)) {
    fs.mkdirSync(controller.workingDir);
}

controller.handle = function (req, res) {
    // Check for base64 images in req
    let base64Images = req.body.image.map(img => img.replace(/^data:image\/png;base64,/, ''));
    let tempDir = path.join(controller.workingDir, Date.now().toString());
    let counter = 1;

    fs.mkdirSync(tempDir);

    base64Images.forEach(function (base64Image) {
        let currPath = path.join(tempDir, counter.toString() + '.png');

        fs.writeFile(currPath, base64Image, 'base64', function (err) {
            if (err) {
                console.log(err)
                res.status(500).json({'Error': 'Error uploading image'});
            }
        });

        counter++;
    });

    let data = {
        tempDir: tempDir
    };

    // spawner.compute(data, function (results) {
    //     res.send(results);
    // });

    controller.makeReq(data, function (results) {
        res.send(results);
    });
};

controller.makeReq = function(data, callback) {
    controller.reqOptions.body = data;

    request(controller.reqOptions)
    .then(function (result) {
        callback(result);
    });
};


module.exports = controller;