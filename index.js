var restify = require('restify')
var route = require('./route')

var server = restify.createServer()

server.name = "LogDB"

server.get('/:method/:message', route.get)
server.post('/', route.post)

exports.interfaces = {
    REST: server,
    TCP: undefined,
    UDP: undefined
}

if (require.main === module) {
    server.listen(9090, function() {
	console.log('%s listing at %s', server.name, server.url)
    })
}