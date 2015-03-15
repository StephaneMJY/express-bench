var cassandraBase = function (collection) {

    var client = require('./database.js');

    function generateGetQuery(params) {
        var query = 'SELECT * FROM ' + collection + ' WHERE ';
        var paramKeys = Object.keys(params);
        for (var i = 0; i < paramKeys.length; i++) {
            if (i !== 0) {
                query += ' AND ';
            }
            if (isNaN(Number(params[paramKeys[i]]))) {
                query += paramKeys[i] + ' = ' + "'" + params[paramKeys[i]] + "'";
            } else {
                query += paramKeys[i] + ' = ' + params[paramKeys[i]];
            }
        }
        if (paramKeys.length === 0) {
            query = '';
        }
        return query;
    }

    this.findOneBy = function (params, callback) {
        var query = generateGetQuery(params);
        if (query) {
            client.execute(query, function (err, result) {
                if (result.rows.length === 0) {
                    callback('Error');
                } else if (err) {
                    callback(err);
                } else {
                    callback(result.rows[0]);
                }
            });
        } else {
            callback('Error');
        }
    };

    this.findBy = function (params, callback) {
        var query = generateGetQuery(params);
        if (query) {
            client.execute(query, function (err, result) {
                if (result.rows.length === 0) {
                    callback('Error');
                } else if (err) {
                    callback(err);
                } else {
                    callback(result.rows);
                }
            });
        } else {
            callback('Error');
        }
    };

    this.find = function (callback) {
        var query = 'SELECT * FROM ' + collection;
        client.execute(query, function (err, result) {
            if (result.rows.length === 0) {
                callback('Error');
            } else if (err) {
                callback(err);
            } else {
                callback(result.rows);
            }
        });
    };

    this.findByDateRange = function (params, callback) {
        if (!params.dayRange) {
            callback('Error');
        }
        var dayQuery = ' IN (';
        for (var i = params.dayRange.from; i < params.dayRange.to + 1; i++) {
            dayQuery += i;
            if (i !== params.dayRange.to) {
                dayQuery += ', '
            }
        }
        dayQuery += ')';
        delete params.dayRange;
        var query = generateGetQuery(params);
        query += ' AND day' + dayQuery;
        client.execute(query, function (err, result) {
            if (result.rows.length === 0) {
                callback();
            } else if (err) {
                callback(err);
            } else {
                callback(result.rows);
            }
        });
    };

};

module.exports = cassandraBase;