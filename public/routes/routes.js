var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('newIndex', {user: req.user});
});


router.get('/index', function (req, res) {
        res.render('newIndex', {user: req.user});
});

router.get('/remote', function (req, res) {
        res.sendfile('remote.html');
});

//A retravailler, la fonction ensureAuthenticated ramène au menu principal
router.get('/register', ensureAuthenticated, function(req, res) {
    res.render('register', { user: req.user });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Désolé, le nom d'utilisateur désiré est déjà pris. Veuillez essayer encore"});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page with a info written.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      console.log('identification problem');
      return res.render('login', {info: "Désolé, le nom d'utilisateur/mot de passe est faux. Veuillez essayer encore"})
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.render('newIndex', { user : req.user });
    });
  })(req, res, next);
});


router.get('/account', function(req, res){
  res.render('account', { user: req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.render('newIndex', { user: req.user });
});


router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


module.exports = router;
