var console = require('./console')
console = new console()

exports.get = function(req, res, next) {
    var method = req.params.method
    var msg = req.params.message
    console[method](method, msg)
    res.send({msg: 'SUCCESS'})
}

exports.post = function(req, res, next) {
    res.send({msg:'Not Yet Implemented'})
}