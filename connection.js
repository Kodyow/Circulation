var mysql = require('mysql2');
/**
 * mySql Connection
 */
var connection = mysql.createConnection({
    host     : '34.71.155.174',
    user     : 'All',
    password : 'group8',
    database : 'CirculationProd'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;