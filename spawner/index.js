var spawn = require('child_process').spawn;
var config = require('../config/general-config');

var spawner = {};

spawner.startPyWorker = function () {
    spawner.process = spawn(config.py.executer, ['-W ignore', config.py.rootProcessPath]);
    spawner.process.stdin.pipe(process.stdin);
    spawner.process.stdout.pipe(process.stdout);
    spawner.process.stderr.pipe(process.stderr);
};

spawner.compute = function (data, callback) {
    let { base64Images, tempDir } = data;

    spawner.startPyWorker();
    spawner.process.stdin.write(tempDir);
    spawner.process.stdin.end();

    spawner.process.stdout.on('data', function (data) {
        callback(data.toString());
    });
}

// spawner.compute('saran.', function (data) {
//     console.log(JSON.parse(data));
// });


module.exports = spawner;