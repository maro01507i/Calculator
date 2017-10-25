var path = require('path');
    mongo = require('mongodb').MongoClient;
    express = require('express');
    http=require('http');
var app  = express();
var url = 'mongodb://localhost:27017/calculador';

app.get('/',function(req,res){
	
app.use(express.static(path.join(__dirname, '/public')));
	
res.sendFile(__dirname + '/public/index.html');
});

app.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('calculador', {items: resultArray});
        });
    });
});

app.get('/insertOP', function(req, res) {
    console.log("Insertar");
    var item = {
        op1: req.body.op1,
        lista:req.body.lista,
        op2: req.body.op2,
        result: req.body.result
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('user-operations').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/');
});


var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);