var spawner = require('../spawner');
var fs = require('fs');
var path = require('path');
var config = require('../config/general-config');
var request = require('request-promise');
var googleapi = require('../../cli-montha/oauth');
var db = require('../../cli-montha');

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
        tempDir: tempDir,
        req: req,
        res: res
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
        dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let apiRequest = {};
        apiRequest.noofhours = data.req.body.hours || 1;

        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;

        apiRequest.date = dd.toString() + '/' + mm.toString();
        apiRequest.day = dayArr[date.getDay()];

        listArr = []
        for(i = 0; i < result['absent'] + result['present']; ++i) {
            listArr.push('P');
        }
        for(i = 0; i < result['absent']; ++i) {
            listArr[result['absentRNos'][i] - 1] = 'A';
        }
        
        apiRequest.list = listArr;
        // console.log(apiRequest);
        db.findSpreadSheetId(data.req.body.subject, (spreadSheetId) => {
            googleapi.appendData(spreadSheetId, apiRequest, apiRequest.noofhours);
        });
        
        callback(result);
    });
};


module.exports = controller;