var path = require('path');

    express = require('express');
    http=require('http');
var app  = express();

app.get('/',function(req,res){
	
app.use(express.static(path.join(__dirname, '/resources')));
	
res.sendFile(__dirname + '/resources/index.html');
});

app.get('/calculador',function(req,res){
	
app.use(express.static(path.join(__dirname, '/resources')));
	
res.sendFile(__dirname + '/resources/calculador.html');
});

var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);