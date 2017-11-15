var path = require('path');
mongo = require('mongodb').MongoClient;
express = require('express');
http=require('http');
bodyParser = require('body-parser');
var app  = express();
var assert = require('assert');
var url = 'mongodb://localhost:27017/Calculador';
var calcular = require("./Node/utilities");
var email = require("./Node/utilities");

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
        var cursor = db.collection('Operacion').find({},{'_id': 0,'op1': 1,'op2': 1,'lista': 1,'result': 1}).sort({$natural:-1}).limit(4);
        var number = 0;
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            console.log(doc);
            resultArray.push(doc);
            number++;
        }, function() {
            db.close();
            res.contentType('application/json');
            resultArray[resultArray.length] = number;
            var jsonString = JSON.stringify( resultArray );
            res.json(jsonString);
        });
    });
});

app.post('/insertOP', function(req, res) {

    var item = {
        op1: req.body.op1,
        lista:req.body.lista,
        op2: req.body.op2,
        result: calcular.calcular(req.body.op1,req.body.op2,req.body.lista)
    };
    if (item) {
        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('Operacion').insertOne(item, function (err, result) {
                assert.equal(null, err);
                console.log('Operation inserted');
                db.close();
            });
        });
    }
    app.use(express.static(path.join(__dirname, '/public')));
    res.sendFile(__dirname + '/public/calculador.html');
});

app.post('/registro', function(req, res) {

    var item = {
        nombre: req.body.nombre,
        email:req.body.email,
        psw: req.body.psw
    };
    if (item) {
        /* User.find({ 'username': username,'email':email }, function(err, user) {

             if (err) {

                 console.log('Signup error');
                 return done(err);
             }

             //if user found.
             if (user.length!=0) {
                 if(user[0].username){
                     console.log('Username already exists, username: ' + username);
                 }else{
                     console.log('EMAIL already exists, email: ' + email);
                 }
                 var err = new Error();
                 err.status = 310;
                 return done(err);

             }*/
        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('Users').insertOne(item, function (err, result) {
                assert.equal(null, err);
                console.log('User inserted');
                db.close();
                email.sendEmail(req,res);
            });
        });
    }
    app.use(express.static(path.join(__dirname, '/public')));
    res.sendFile(__dirname + '/public/respuestaRegistro.html');
});

app.post('/sendMs', function(req, res) {

    var item = {
        nombre: req.body.name,
        asunto:req.body.subject,
        mensaje: req.body.message
    };

    if (item){
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection('Mensajes').insertOne(item, function(err, result) {
                assert.equal(null, err);
                console.log('Message inserted');
                db.close();
            });
        });
        app.use(express.static(path.join(__dirname, '/public')));
        res.sendFile(__dirname + '/public/respuesta.html');
    }
});

app.post('/removeOP', function(req, res) {

    var item = {
        op1: req.body.op1,
        lista:req.body.lista,
        op2: req.body.op2,
        result: calcular.calcular(req.body.op1,req.body.op2,req.body.lista)
    };
    console.log(item);
    if (item) {
        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('Operacion').removeOne(item, function(err, result) {
                assert.equal(null, err);
                console.log('Operation eliminated');
                db.close();
            });
        });
    }
    app.use(express.static(path.join(__dirname, '/public')));
    res.sendFile(__dirname + '/public/calculador.html');
});

var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);


