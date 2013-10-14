program = require('commander')

program
    .version('0.0.1')
    .option('-d, --dump', 'Dump DB')
    .option('-p, --port <port>', 'Server Port')
    .option('-s, --sockets', 'Use Sockets')
    .option('-r, --runserver', 'Run the server')
    .parse(process.argv)

var LogDb = require('../index')
var db = require('../database')
var es = require('event-stream')

//global program

if ( program.dump ) {
    console.Console(es.through(function(){}))
    var readStream = db.connect(function(db) {
	
	var read = function (readStream) {
	    readStream.pipe(es.stringify()).pipe(process.stdout)
	    
	    readStream.on('end', function(){
		process.exit(1)
	    })
	}
	read(db.createReadStream())
    })
}


if ( program.port ) {
    if ( program.runserver ) {
	var server = LogDb.interfaces.REST

	server.listen(program.port, function() {
	    console.log('%s listing at %s', server.name, server.url)
	})
    }
}
