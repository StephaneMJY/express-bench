var cassandra = require('../cassandra-base.js')

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.send('Hello World');
    });
};