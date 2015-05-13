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
var db = mongoose.connect('mongodb://localhost/local', function(){
	console.log('Connection to MongoDB_local Ready')
});

//Affichage dans la console que le serveur est prêt, écoutant sur le port défini plus haut, ligne 34
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;

//ici doit venir les commandes (ou fichiers) gérant les fonctions johnny-five

//var johnny = require('./public/js/johnny');

//Initialisation des variables
    var listUser = new Array();
    var PORT = 'COM3';
    var boardConnected = false;  
    

//Constructeur d'équipement
function Equipement(adress, place, object, protocol){
    this.adress = adress;
    this.place = place;
    this.object = object;
    this.protocol = protocol;
    this.name = object + place + adress;
};

var ledPins = [];
var sensorPins = [];

//Création des nouveaux equipements --- Ajouter ICI les nouveaux équipements ---
var listeEquipement = [
    new Equipement(13, 'Cuisine', 'led', 'digital'),
    new Equipement(12, 'Cuisine', 'led', 'digital'),
    new Equipement(11, 'Salon', 'led', 'digital'),
    new Equipement(10, 'Chambre', 'led', 'digital'),
];

var listeInput = [
    new Equipement('A0', 'Cuisine', 'temperature', 'analog'),
    new Equipement('A1', 'Salon', 'temparature', 'analog'),
    new Equipement('A5', 'TEST', 'sensor', 'analog'),
];

var listeNom = [];

//Définition automatique de la liste des pins utilisées en fonction de la liste d'équipement 
// -- Automatiquement généré --
for (var i = 0; i < listeEquipement.length; i++){
    ledPins[i] = listeEquipement[i].adress;
    listeNom[i] = listeEquipement[i].name;
};

for (var i = 0; i < listeInput.length; i++){
    sensorPins[i] = listeInput[i].adress;
};


// create the board connected to the port selected - A changer quand on passera sur linux
// Créer ici une fonction avec le module "SerialPort" afin d'énumérer les ports usb
// de regarder s'il y a une carte, assigner cette valeur a la variable PORT, et activer la partie de dessous
        
        
    var board = new five.Board({port: PORT});    
        
        //Enummération des Pins utilisées par les leds supplém.
        
        var ioState = [];
        var leds = [];
        var board;
        
        
        //Fonction test des IO -- Automatiquement généré --
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
        leds = new five.Leds(ledPins);
        
        //création d'un senseur basé sur le LM35
        sensorTempCuisine = new five.Temperature({
            controller: "LM35",
            pin: sensorPins[0],
            freq: 1000,
        });
        //et un deuxieme, pour le salon
        sensorTempSalon = new five.Temperature({
            controller: "LM35",
            pin: sensorPins[1],
            freq: 1000,
        });
        //et un de test pour remplacer le multimetre
        sensorTest = new five.Sensor({
            pin: sensorPins[2],
            freq: 1000,
        });
        
        
        
        //On associe à chaques objets de listeNom un objet Johnny-Five -- Automatiquement généré --
        for (var i = 0; i < listeEquipement.length; i++){
            listeNom[i] = leds[i];
        }; 
        
        //Permet d'acceder au led au travers de l'objet leds[i] -- Automatiquement généré --
        //Permet d'activer les leds par la console (Non obligatoire?!)
        board.repl.inject({
            leds: leds,
            sensorTempCuisine: sensorTempCuisine,
            sensorTempSalon: sensorTempSalon,
            sensorTest: sensorTest,
        });
        
        boardConnected = true;
        });
        
        
//Socket.io Server - A la connexion
io.sockets.on('connection', function (socket, username) {
    
    //A chaques connexion, relancer la fonction de test des io -- Automatiquement généré --
    testIO();
    
    //Récupération des personnes connectées ------- EN COURS -------
    socket.on("nouveau_client", function(username){
        //On stock le pseudo dans une variable de session
        socket.username = username;
        if (listUser.indexOf(username)){
            console.log("username already connected")
        }
        else{
            listUser.push(username);
        };
        //On emmet un message a tous
        socket.broadcast.emit("nouveau_client", username);
    });
    
    //Si la carte est connectée
    if (boardConnected){
        console.log("People Connected with Board Ready, proceeding...");
        console.log("IO State: " + ioState);
        //Initialisation et passage des PINS allumés a la page HTML + Liste équipement
        socket.emit('alreadyOn', {ioState: ioState, listeEquipement: listeEquipement});
        
        //réceptions des données du senseur temp. Cuisine
        sensorTempCuisine.on("change", function(err, data){
            //Suppression des chiffres après la virgule
            var temperature = parseInt(data.celsius, 10);
           //console.log('Température Cuisine: '+temperature+'°C');
           socket.emit("sensor", {type: 'temperature', salle: 'Cuisine', valeur: temperature});
        });
        
        //réceptions des données du senseur temp. Salon
        sensorTempSalon.on("change", function(err, data){
            //Suppression des chiffres après la virgule
            var temperature = parseInt(data.celsius, 10);
           //console.log('Température Salon: '+temperature+'°C');
           socket.emit("sensor", {type: 'temperature', salle: 'Salon', valeur: temperature});
        });
        
        //reception des données du senseur test, remplacant du multimetre
        sensorTest.scale(0,5).on("change", function(){
            socket.emit("sensor", {type: 'senseur', salle: 'TEST', valeur: this.value});
        })
        
        //comportement au clique sur un bouton - Faire un case pour chaques appareil.
        socket.on("toggleEquipement", function(data){                
            console.log("Reception de l'instruction Toggle: " + data)
            switch (data){
                case "ledCuisine1":
                    leds[0].toggle();
                    break;
                case "ledCuisine2":
                    leds[1].toggle();
                    break;
                case "ledSalon":
                    leds[2].toggle();
                    break;
                case "ledChambre":
                    leds[3].toggle();
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
                            leds[0].brightness(amount);
                            break;
                        case "Cuisine2":
                            leds[1].brightness(amount);
                            break;
                        case "Salon":
                            leds[2].brightness(amount);
                            break;
                        case "Chambre":
                            leds[3].brightness(amount);
                            break;
                    
                        default:
                            console.log("Probleme: Fonction: updateLight, Instruction inconnue: "+ data);
                    }
        });
    }
    else{
        console.log("WARNING, board disconnected for now!");
    };
    
    //Fonction de test - Utile pour tester diverses fonctions.
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
