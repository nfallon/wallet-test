
//database
const pg = require('pg');
const args = require('../args');

//read comamnd line. use environment variables as fallback (necessary for testing with mocha)
var user = args.name('db.postgres.username') || process.env['db.postgres.username'];
var password = args.name('db.postgres.password') || process.env['db.postgres.password'];
var database =  args.name('db.postgres.database') || process.env['db.postgres.database'];
var host = args.name('db.postgres.host') || process.env['db.postgres.host'];
var port = args.name('db.postgres.port') || 5432;
var max_connections = args.name('db.postgres.maxconnections') || 300;
var idle_timeout_millis = args.name('db.postgres.idletimeoutmillis') || 3000;

var dbConfig = {
    user: user,
    password: password,
    database: database,
    host: host,
    port: port,
    max: max_connections,
    idleTimeoutMillis: idle_timeout_millis
}

console.log(dbConfig);

const pool = new pg.Pool(dbConfig);
pool.on('error', function (err) {
    console.log ('idle client error', err.message, err.stack);
});
module.exports = {
	pool,
	query: (text, params, callback) => {
        return pool.query(text, params, callback);
	}
}
