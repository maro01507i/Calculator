var path = require('path');
    mongo = require('mongodb').MongoClient;
    express = require('express');
    http=require('http');
    bodyParser = require('body-parser');
var app  = express();
var assert = require('assert');
var url = 'mongodb://localhost:27017/Calculador';

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
	
app.use(express.static(path.join(__dirname, '/public')));
	
res.sendFile(__dirname + '/public/index.html');
});


app.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('Calculador').find().sort({$natural:-1}).limit(4);
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('Calculador', {items: resultArray});
        });
    });
});

app.post('/insertOP', function(req, res) {

   var item = {
        op1: req.body.op1,
        lista:req.body.lista,
        op2: req.body.op2,
        result: calcular(req.body.op1,req.body.op2,req.body.lista)
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('Calculador').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    app.use(express.static(path.join(__dirname, '/public')));
    res.sendFile(__dirname + '/public/calculador.html');
});


var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);

function calcular(op1,op2,op){
    if(op == "+")return Number(op1) + Number(op2);
    else if(op == "-")return op1 - op2;
    else if(op == "*")return op1 * op2;
    else if(op == "/")return op1 / op2;
    else if(op == "b")return Math.pow(op1,op2);

}
