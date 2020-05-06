var generalConfig = {
    privateResConfig: {
        userPath: 'users',
        subPath: 'subjects'
    },
    dbConfig: {
        user: 'admin',
        pwd: 'foxneutral'
    },
    py: {
        executer: 'py',
        rootProcessPath: 'core/facenet.py',
        workingDir: 'temp',
        reqOptions: {
            method: 'POST',
            uri: 'http://localhost:5000/compute',
            json: true
        }
    }
};


module.exports = generalConfig;