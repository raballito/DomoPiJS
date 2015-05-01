//Tout ce qui est en anglais vient du générateur automatique
//Dépendances du back-end
var express = require('express');
var path = require('path');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ensureLoggedIn = require('connect-ensure-login');
var five=require('johnny-five');
var Account = require('./public/models/account');

var routes = require('./public/routes/routes');
var users = require('./public/routes/users');


var app = express();


var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var spawn = require('child_process').spawn;
var omx = require('omxcontrol');

//ici vient le reste des dépendances y compris les liens vers les autres JS "nodeux"


// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 80);


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));
//Initialisation de Passport pour le login
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Plugin de controle pour OMXPlayer - lecteur video du RPi - WIP
app.use(omx());

//routes pour le serveurs dans un fichier externe - A retravailler car l'appel '/' renvoie de la merde
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// passport config
var Account = require('./public/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//mongoose - connection a la base de donnée de DomoPiJS
mongoose.connect('mongodb://localhost/local', function(){
	console.log('Connection to MongoDB_local Ready')
});

//Affichage dans la console que le serveur est prêt, écoutant sur le port défini plus haut, ligne 34
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;

//ici doit venir les commandes (ou fichiers) gérant les fonctions johnny-five

//var johnny = require('./public/js/johnny');

// create the board connected to the port selected - A changer quand on passera sur linux
// Créer ici une fonction avec le module "SerialPort" afin d'énumérer les ports usb
// de regarder s'il y a une carte, assigner cette valeur a la variable PORT, et activer la partie de dessous
        
        var PORT = 'COM3';
        var boardConnected = false;
        /*
        board = new five.Board({port: PORT});
        var board,ledCuisine1, ledCuisine2;

        // when board is ready
        board.on('ready', function() {
          // create Led component connected to the pin 13
          ledCuisine1 = new five.Led({
            pin: 13
          });
          // create Led component connected to the pin 5
          ledCuisine2 = new five.Led({
            pin: 12
          });
          // and inject Led and Motor in the Repl of the board
          board.repl.inject({
            ledCuisine1: ledCuisine1,
            ledCuisine2: ledCuisine2,
          });
          
          boardConnected = true;
          
        });
        */
   
//Socket.io Server
io.sockets.on('connection', function (socket) {
    
    if (boardConnected){
        if(ledCuisine1.isOn){
            socket.emit('ledCuisine1isOn');
            console.log("Lumiere deja allumee");
        };
    
    
        //comportement matériel
        socket.on("toggleLedCuisine1", function(data){
            if(ledCuisine1.isOn){
                console.log('toggleLedCuisine1 recu:extinction');
                ledCuisine1.off()
            }
            else{
                console.log('toggleLedCuisine1 recu: allumage');
                ledCuisine1.on(); 
            }
        
        });
    }
    else{
        console.log("WARNING, board disconnected!");
    };
    
    socket.on("test", function(data){
        console.log("Reception de l'instruction 'test' ");
    });
               
        
    //comportement a la connection de l'ecran
 socket.on("screen", function(data){
   socket.type = "screen";
   ss = socket;
   console.log("Screen ready...");
 });
 socket.on("remote", function(data){
   socket.type = "remote";
   console.log("Remote ready...");
 });

 socket.on("controll", function(data){
	console.log(data);
   if(socket.type === "remote"){

     if(data.action === "tap"){
         if(ss != undefined){
            ss.emit("controlling", {action:"enter"});
            }
     }
     else if(data.action === "swipeLeft"){
      if(ss != undefined){
          ss.emit("controlling", {action:"goLeft"});
          }
     }
     else if(data.action === "swipeRight"){
       if(ss != undefined){
           ss.emit("controlling", {action:"goRight"});
           }
     }
     else if(data.action === "swipeDown"){
       if(ss != undefined){
           ss.emit("controlling", {action:"goDown"});
           }
     }
     else if(data.action === "swipeUp"){
       if(ss != undefined){
           ss.emit("controlling", {action:"goUp"});
           }
     }

   }
 });

 socket.on("video", function(data){

    if( data.action === "play"){
    var id = data.video_id,
         url = "http://www.youtube.com/watch?v="+id;

    var runShell = new run_shell('youtube-dl',['-o','%(id)s.%(ext)s','-f','/18/22',url],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            //child = spawn('omxplayer',[id+'.mp4']);
            omx.start(id+'.mp4');
        });
    }

 });

 socket.on('register', function(data) {
     //console.log(data);     
     var username = data[0];
     var password = data[1];
     var info = "Aucun probleme est survenu. ";
     var message = "L'utilisateur à bien été enregistré";
     Account.register(new Account({username: username}), password, function(err, account) {
        if (err) {
          console.log(err);
          info = "Une erreur est apparue: ";
          message = err.message;
        }
      
      socket.emit('newInfo', message);
      console.log(info + username + " : " + message);
      
    });
});
 
});
