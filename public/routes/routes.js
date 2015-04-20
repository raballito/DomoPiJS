var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var Account = require('../../models/account');
var router = express.Router();

/*router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});
*/

/*router.get('/index', function (req, res) {
  var cwd = process.cwd();
        var indexFile = cwd + "/public/index.html";
		
        res.sendfile(indexFile, {user: req.user});
});*/

router.get('/remote', ensureAuthenticated, function (req, res) {
  var cwd = process.cwd();
        var indexFile = cwd + "/public/remote.html";
        res.sendfile(indexFile, {user: req.user});
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
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
      return res.render('login', {info: "Sorry. That username/password is wrong. Try again."})
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});


router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
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