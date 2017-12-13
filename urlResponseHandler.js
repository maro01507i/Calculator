var path = require('path');
/*var MongoClient = require('mongodb').MongoClient;
var conversionsXML = "";*/
var assert = require('assert');
var express = require("express");
var url = 'mongodb://localhost:27017/Calculador';
//var mongoose = require('mongoose').Mongoose

var mongoose = require('mongoose');
mongoose.connect(url);
var app = express();

var assert = require('assert');
var calcular = require("./utilities");
var email = require("./utilities");
app.use(express.static(path.join(__dirname, '/public')));
var Schema = mongoose.Schema({
    email : String
});

function getOPs(req,res) {
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

}

function insertUser(req,res) {

    var item = {
        nombre: req.body.nombre,
        email:req.body.email,
        psw: req.body.psw
    };
    if (item) {
        //var mongoose = require('mongoose');
        var Usuarios = mongoose.model( "Model",Schema,"Users");
        Usuarios.find({'email': req.body.email}, function(err, user) {
            console.log(user.length);
            if (user.length) {
                res.sendStatus(409);
            }
            else{
                mongo.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('Users').insertOne(item, function (err, result) {
                        assert.equal(null, err);
                        console.log('User inserted');
                        db.close();
                        email.sendEmail(req);
                        res.sendStatus(200);
                    });
                });}
        })



    }
    else res.sendStatus(400);
}

function login(req,res) {

    var mail = req.body.email;
    var psw =  req.body.psw;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var number = db.collection('Users').find({$and: [ {email: mail}, {psw: psw}]}).count();
        console.log(number);
        if(number == 0){
            res.sendStatus(401);
        }

        else {
            res.redirect("index.html");
        }
    });

    // passport/login.js
    /* passport.use('login', new LocalStrategy({
             passReqToCallback : true
         },
         function(req, username, password, done) {
             // check in mongo if a user with username exists or not
             User.findOne({ 'username' :  username },
                 function(err, user) {
                     // In case of any error, return using the done method
                     if (err)
                         return done(err);
                     // Username does not exist, log error & redirect back
                     if (!user){
                         console.log('User Not Found with username '+username);
                         return done(null, false,
                             req.flash('message', 'User Not found.'));
                     }
                     // User exists but wrong password, log the error
                     if (!isValidPassword(user, password)){
                         console.log('Invalid Password');
                         return done(null, false,
                             req.flash('message', 'Invalid Password'));
                     }
                     // User and password both match, return user from
                     // done method which will be treated like success
                     return done(null, user);
                 }
             );
         }));*/
}

function insertOP(req,res) {

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
    res.sendStatus(200);
}


function sendMS(req,res) {

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
        res.sendStatus(200);
    }
}

function removeOP(req,res) {
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
                if(err){
                    res.sendStatus(500);
                }
                assert.equal(null, err);
                console.log('Operation eliminated');
                db.close();
                res.sendStatus(200);

            });
        });
    }
    else res.sendStatus(500);
}

exports.getOPs = getOPs;
exports.login = login;
exports.insertOP = insertOP;
exports.insertUser = insertUser;
exports.sendMS = sendMS;
exports.removeOP = removeOP;