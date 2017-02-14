var express = require('express');
var db = require('./../src/com/ufko/utils/db');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  db.query("select * from User where id in (?) ", [[101000000]], function(results){
    console.log("results: " + results.length);
  });

  res.send('respond with a resource!' + req._passport.session.user.username);
});

/* GET users listing. */
router.get('/test/:id', function(req, res, next) {

  db.query("select * from User where id in (?) ", [[101000000]], function(results){
    console.log("results: " + results.length);
  });

  res.render('index', {
    title: req._passport.session.user.username
  });
});

module.exports = router;
