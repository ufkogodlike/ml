var mysql = require('mysql');
var settings = require('./../../../../routes/global/settings.json');

var pool;

function getPool() {
    if (!pool) {
        pool = mysql.createPool(settings);
    }
    return pool;
}

function query(sql, params, callback) {

    var values;

    getPool().getConnection(function(err, connection) {
        if (err) throw err;

        connection.query({
                sql: sql,
                timeout: 50 * 1000
            },
            params, function(err, rows) {

                callback(rows);

                connection.release();
            }
        );
    });

    return values;
}

module.exports = {
    query: query
};