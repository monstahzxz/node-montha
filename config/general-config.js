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
        workingDir: 'temp'
    }
};


module.exports = generalConfig;