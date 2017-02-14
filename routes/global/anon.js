var path = require('path');
var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get(path.join('/login'),
    function(req, res, next) {
        res.render('login', {
            message: req.query.msg,
            ttt: "Hello"
        });
    }
);

router.post(path.join('/login'),
    passport.authenticate('local', { failureRedirect: '/login?msg=Error' }),
    function(req, res) {
        res.redirect('/users/1111');
    }
);

module.exports = router;
