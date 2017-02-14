var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var authorizationService = require('./src/com/ufko/services/authorizationService');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var anon = require('./routes/global/anon');
var authorization = require('./routes/global/authorization');
var users = require('./routes/users');

//################# Passport settings start #################

var testUser = { id: 1, username: 'aaa', password: '111', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] };

passport.use(new Strategy(
    function(username, password, cb) {
      authorizationService.authorize(username, password, cb);
    }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  console.log("<<<<<<<<<<<" + user);
  cb(null, user);
});

//################# Passport settings start #################

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge : 30 * 60 * 1000 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', anon);
app.use('/', authorization);
app.use('/users', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
