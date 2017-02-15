var express = require('express');
var db = require('./../src/com/ufko/utils/db');
var router = express.Router();

/* GET users listing. */
router.get('/main', function(req, res, next) {

  db.query("select * from Wish where userId = ? ", [req._passport.session.user.id], function(results){
    console.log("results: " + results.length);

    res.render('index', {
      title: req._passport.session.user.username,
      currentUser: req._passport.session.user,
      wishes: results
    });

  });
});

module.exports = router;
