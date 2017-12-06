mongo = require('mongodb').MongoClient;
express = require('express');
http=require('http');
bodyParser = require('body-parser');
var app  = express();
var passport = require('passport');
var flash = require('connect-flash');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(session({secret: 'mySecretKey2'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var urlResponseHandlers = require("./urlResponseHandler");
var controller = require("./controller");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.redirect("index.html");
});


app.get('/get-data', function(req, res, next) {
    controller.dispatch(urlResponseHandlers.getOPs, req, res);
});

app.post('/login', function(req, res, next) {
    controller.dispatch(urlResponseHandlers.login, req, res);
});


app.post('/insertOP', function(req, res) {
    controller.dispatch(urlResponseHandlers.insertOP, req, res);
});

app.post('/registro', function(req, res) {
    controller.dispatch(urlResponseHandlers.insertUser, req, res);
});

app.post('/sendMs', function(req, res) {
    controller.dispatch(urlResponseHandlers.sendMS, req, res);
});

app.post('/removeOP', function(req, res) {
    controller.dispatch(urlResponseHandlers.removeOP, req, res);
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

var port = process.env.PORT || 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);


