var express = require('express');
var router = express.Router();

loginOptions = {
  redirectTo: "/login"
};

/* Auth check for all req. */
router.get('/*',

  require('connect-ensure-login').ensureLoggedIn(loginOptions),

  function(req, res, next) {
    next();
  }
);

/* User logout. */
router.get('/logout', function(req, res){
  console.log("User trying to logged out! " + req._passport.session.user.username);
  req.logout();
  res.redirect('/');
});

module.exports = router;
