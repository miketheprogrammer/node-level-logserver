try{
    (function(){
        Object.defineProperty(global, '__stack', {
            get: function() {
                var orig = Error.prepareStackTrace;
                Error.prepareStackTrace = function(_, stack) {
                    return stack;
                };
                var err = new Error;
                Error.captureStackTrace(err, arguments.callee);
                var stack = err.stack;
                Error.prepareStackTrace = orig;
                return stack;
            }
        });

        Object.defineProperty(global, '__line', {
            get: function() {
                return __stack[2].getLineNumber();
            }
        });

        Object.defineProperty(global, '__function', {
            get: function() {
                return __stack[2].getFunctionName();
            }
        });
        
        Object.defineProperty(global, '__file', {
            get: function() {
                var fpath = __stack[2].getFileName().split('/');
                return fpath[fpath.length - 2] + '/' + fpath[fpath.length - 1];
            }
        });

    })();
} catch ( err ) {
    console.warn( err );
}
