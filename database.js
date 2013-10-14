var levelup = require('levelup')
var net = require('net')
var multilevel = require('multilevel')
var request = function() {

}


var port;
if ( program && program.port )
    port = parseInt(program.port)-1
else port = 7777

exports.connect = function(callback) {
    var db;

    db = multilevel.client()
    connection = net.connect(port)

    connection.on('connect', function() {
	console.log('Connected to LevelDB Server')    
	callback(db)
    })

    process.once('uncaughtException', function(e) {	
	console.log(e)
	console.warn("Error trying to connect")
	console.log("Trying to connect to binary instance")

	db = levelup('./logdb')

	var server = net.createServer(function(con) {
	    con.pipe(multilevel.server(db)).pipe(con)
	}).listen(port, function() {
	    console.log('%s listing at %s', "LevelDB", port)
	})

	db.on('error', function(e){
	    console.warn("There was an error connecting to binary instance")
	    console.warn("Shutting process down")
	    process.exit(0)
	})
	callback(db)
    })

    connection.pipe(db.createRpcStream()).pipe(connection)

}