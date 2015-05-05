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

// ----------- OK JUSQUE ICI ------------ Rien a retravailler, excepté peut-être pour ajouter les cookies

//ici doit venir les commandes (ou fichiers) gérant les fonctions johnny-five
//ou les constructeurs!!!

//var johnny = require('./public/js/johnny');

// create the board connected to the port selected - A changer quand on passera sur linux
// Créer ici une fonction avec le module "SerialPort" afin d'énumérer les ports usb
// de regarder s'il y a une carte, assigner cette valeur a la variable PORT, et activer la partie de dessous
        
        
        //Initialisation des variables
        var PORT = 'COM3';
        var boardConnected = false;
        
        var board = new five.Board({port: PORT});
        
        // ------- A RETRAVAILLER ------- initialiser les ports au moyen d'un constructeur 
        //afin de mettre les pin dans un ordre connu par une fonction. Devrait permettre de
        //générer des nom dynamiques en fonction des données du constructeur
        //Enummération des Pins utilisées par les leds supplém.
        var ledPins = [13, 12, 11, 10];
        var ioState = [];
        var leds = [];
        var board,ledCuisine1, ledCuisine2, ledChambre, ledSalon;
        
        
        //Fonction test des IO
          function testIO(){
            var etat = [];
            for (var i = 0; i < leds.length; i++){
                led = leds[i];
                if(leds[i].isOn){
                    //console.log("IO " + i + " is ON");
                    etat[i] = 1;
                }
                else {
                    //console.log("IO " + i + " is OFF");
                    etat[i] = 0;
                }
            }
            ioState = etat;
            return etat;
          };          
                    
        

        // when board is ready
        board.on('ready', function() {
        
        //on donne un array en entrée (ledPins) ==> leds est un array
        leds = new five.Leds(ledPins);    
          
          // ------ RETRAVAILLER ICI ------- ya surement moyen de faire une boucle "for" afin d'initialiser avec un nom tiré d'un constructeur
          // creer la led, attachée a l'INDEX correspondant dans l'array de LEDPINS
          ledCuisine1 = leds[0]; // = pin 13
          // create Led component connected to the pin 12
          ledCuisine2 = leds[1];
          ledSalon = leds[2];
          ledChambre = leds[3];
          
          
          
          //Permet de nommer les leds utilisées en fonction de leur place dans l'array ioState
          //Permet d'activer les leds par la console (Non obligatoire?!)
          board.repl.inject({

            ledCuisine1: ledCuisine1,
            ledCuisine2: ledCuisine2,  
            ledChambre: ledChambre,
            leds: leds,
          });
          boardConnected = true;
          
        });
        
        
//Socket.io Server - A la connexion
io.sockets.on('connection', function (socket) {
    
    //A chaques connexion, relancer la fonction de test des io
    testIO();
    
    
    //Si la carte est connectée
    if (boardConnected){
        console.log("People Connected with Board Ready, proceeding...");
        console.log("IO State: " + ioState);
        //Initialisation et passage des PINS allumés a la page HTML
        socket.emit('alreadyOn', ioState);
    
        //comportement au clique sur un bouton - Faire un case pour chaques appareil.
        socket.on("toggleEquipement", function(data){                
            console.log("Reception de l'instruction Toggle: " + data)
            switch (data){
                case "ledCuisine1":
                    ledCuisine1.toggle();
                    break;
                case "ledCuisine2":
                    ledCuisine2.toggle();
                    break;
                case "ledSalon":
                    ledSalon.toggle();
                    break;
                case "ledChambre":
                    ledChambre.toggle();
                    break;
                    
                default:
                    console.log("Probleme: Instruction inconnue: "+ data);
            }           
        });
        
        //Evenement "updateSlider", permet d'activer le PWM pour les leds
        socket.on('updateSlider', function(data){
            //Définition des variables utiles
            var objet = data[0];
            var emplacement = data[1];
            var amount = data[2];
            console.log(data);
            //Comportement en fonction de l'objet et du lieu
            switch (emplacement){
                        case "Cuisine1":
                            ledCuisine1.brightness(amount);
                            break;
                        case "Cuisine2":
                            ledCuisine2.brightness(amount);
                            break;
                        case "Salon":
                            ledSalon.brightness(amount);
                            break;
                        case "Chambre":
                            ledChambre.brightness(amount);
                            break;
                    
                        default:
                            console.log("Probleme: Fonction: updateLight, Instruction inconnue: "+ data);
                    }
        });
    }
    else{
        console.log("WARNING, board disconnected!");
    };
    
    socket.on("test", function(data){
        console.log("Reception de l'instruction 'test' ");
    });
               
        
 //comportement a la connection de l'ecran - permet l'utilisation des gestes.
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

 //Evenement permettant de controler la video.
 // Telecharge, et execute un nouveau processus système lisant la video
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

 //Evenement "register", permet d'enregistrer avec 2 infos, utilisateur et mot de passe.
 //Ces deux infos sont contenue dans la partie data, qui est un array.
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
