//Fichier gérant les routes: les pages a afficher en fonction de l'url
var express = require('express');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('newIndex');
});


router.get('/index', function (req, res) {
        res.render('newIndex');
});

router.get('/remote', function (req, res) {
        res.sendfile('remote.html');
});

router.get('/login', function(req, res) {
    res.render('login');
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
      user = req.user;
      console.log(user.username + " is now connected");
      //passage de l'utilisateur dans les cookies - n'a pas l'air de marcher...
      res.cookie('user', user, {maxAge: 500});
      req.session.user = user;
      return res.render('newIndex', { user : req.user });
    });
  })(req, res, next);
});


//A garder commentée. Peut etre pratique si l'enregistrement normal ne fonctionne plus, ou pour enregistrer le premier utilisateur
/*
router.get('/register', function(req, res) { 
    res.render('register');
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Désolé, le nom d'utilisateur désiré est déjà pris. Veuillez essayer encore"});
        }

        return res.render("newIndex", {info: "Nouvel utilisateur ajouté avec succès", user: req.user});
    });
});

*/

router.get('/logout', function(req, res) {
    req.logout();
    res.render('newIndex');
});


router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
