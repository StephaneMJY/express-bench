var config = require('config');

var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    keyspace: 'express'
});
client.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Cassandra listening on 127.0.0.1');
    }
});

module.exports = client;