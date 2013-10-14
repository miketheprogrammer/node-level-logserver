require('./stack_helper')
var db = require('./database')

function spliceArguments(args) {
    return [].splice.call(args,0);
}
function Logger() {
}

function put(db, value){
    var timestamp = new Date().getTime()
    db.put(timestamp+'', value)
    console.log(timestamp)
}

db.connect(function(db){
    db = db
    put = put.bind(null, db)
})

Logger.prototype.log = function log(){
    var args = spliceArguments(arguments)
    console.log.apply(null, args)
    console.log(args)
    put(args[1])
    
}

Logger.prototype.info = function info() {
    console.info.apply(null, spliceArguments(arguments))
}

Logger.prototype.warn = function warn() {
    console.warn.apply(null, spliceArguments(arguments))
}

Logger.prototype.error = function error() {
    console.error.apply(null, spliceArguments(arguments))
}

Logger.prototype.dir = function dir() {
    console.dir.apply(null, spliceArguments(arguments))
}

Logger.prototype.time = function time() {
    console.time.apply(null, spliceArguments(arguments))
}

Logger.prototype.timeEnd = function timeEnd() {
    console.timeEnd.apply(null, spliceArguments(arguments))
}

Logger.prototype.trace = function trace() {
    console.trace.apply(null, spliceArguments(arguments))
}

Logger.prototype.assert = function assert() {
    console.assert.apply(null, spliceArguments(arguments))
}

module.exports = Logger