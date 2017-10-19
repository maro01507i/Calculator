var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/calcular"] = requestHandlers.calcular;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);