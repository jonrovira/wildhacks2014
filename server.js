// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');

// configuration ===========================================
    
// config files
var db = require('./config/database');

// pass in the passport to create authentication strategies
require('./server/passport.js')(passport);

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app')); 
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/dist'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({ secret: 'nevilandjonmakeanapp'}));
app.use(flash());

// "bower_components" is the directory used in the index.html
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// routes ==================================================
require('./server/routes')(app, passport); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;