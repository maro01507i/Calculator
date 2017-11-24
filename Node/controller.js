

function dispatch(handler, req, res) {
    var content = "";
    if (typeof handler === 'function') {
        content += handler(req, res);
    } else {
        /*console.log("No request handler found for " + pathname);*/
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('"No request handler found: ' + handler);
        res.end();
    }
}

exports.dispatch = dispatch;