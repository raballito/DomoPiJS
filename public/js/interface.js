console.log("Chargement de js/interface.js fini");

//Initialisation des fonctions démarant au chargement de la page
$(document).ready(function(){
      time(); //heure
      Weather.init(); //météo
      });   



//Obtention de l'Heure
//Initialisation des variable: minutes, secondes et heure.
var plusm;
var pluss;
var heure;

//Fonction d'appel et de répétition toute les secondes
function time(){
auj=new Date();
if(auj.getMinutes()<10){plusm="0"}else plusm='';
if(auj.getSeconds()<10){pluss="0"}else pluss='';
//Concaténage dans la variable "heure"
heure= + auj.getHours() + ' : ' + plusm + auj.getMinutes() + ' : ' + pluss + auj.getSeconds() + ' </span>';
//On remplace l'objet "horloge" avec la variable "heure" qui est la ligne du dessus
document.getElementById('horloge').innerHTML=heure;
//On rappel la fonction toutes les 1000 ms
setTimeout("time()",1000)}

//Obtention de la Date
// Obtention de la date
var now = new Date();    
// Array des jours de la semaine
var days = new Array('Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi');
// Array des mois de l'année
var months = new Array("Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"); 
// Calcul du numéro de jour de la semaine
var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
// Calcul des 4 chiffres de l'année
function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
};
// On mets le tout dans une variable nommée "today"
today =  days[now.getDay()] + ", " + date + " "  + months[now.getMonth()] + " "  + (fourdigits(now.getYear())) ;
//Passage de la date (today) dans la div d'ID "dayDate"
document.getElementById('dayDate').innerHTML=today;  

//Script anim début (pas fonctionnelle encore - doit aller avec la premiere balise div dans le 'body' du html)
var Loader = {
  loader: $('#loader'),
  show: function() {
	this.loader.siblings('div').hide();
	this.loader.show();
  },
  hide: function() {
	  this.loader.siblings('div').show();
	this.loader.hide();
  }
};


// Fonctions météo - Disponibilité uniquement en anglais... 
// ------ A AJOUTER: fct permettant de verifier la disponibilité en ligne de l'API et envoyer un message d'erreur sinon
  
//On initialise la variable Weather, et on définit des fonctions permettant de récuppérer la météo
var Weather = {
    //Initialisation avec les paramettre configurés sur Lausanne
	init: function(){
		this.getWeather('c9d417b22edc92cf','CH','Lausanne');
	},
    //A l'appel de la fonction weather.init(), celle-ci appelle la fonction d'apres: getWeather.
	getWeather: function(key, country, city){
		var that = this;
		Loader.show();
		var url = "http://api.wunderground.com/api/"+key+"/forecast10day/q/"+country+"/"+city+".json?callback=?";
		$.getJSON(url, function(data){
			Loader.hide();
			var forecastObj = [];
			var forecast = data.forecast.simpleforecast.forecastday;
			$(forecast).each(function(key, value){
				if(key < 7){
				forecastObj = {
					"day":value.date.weekday,
					"low":value.low.celsius, 
					"high":value.high.celsius,
					"icon":that.condition(value.icon_url)};	
				
					var template = $('#weatherTpl').html(),
					    html = Mustache.to_html(template, forecastObj);
					$('ul.weather').append(html);		
					}
			});	
		});	
		
	},
    //changement du code renvoyé par l'API par une lettre (qui sera interpretée comme une icone)
	condition: function (url){
		var matcher = /\/(\w+).gif$/;
		var code = matcher.exec(url);
		if (code) {
		  code = code[1];
		} else {
		  // We can't find the code
		  code = null;
		}
		switch(code) {
	
		  case "chanceflurries":
		  case "chancesnow":
			return "p";
	
		  case "/ig/images/weather/flurries.gif":
			return "]";
	
		  case "chancesleet":
			return "4";
	
		  case "chancerain":
			return "7";
	
		  case "chancetstorms":
			return "x";
	
		  case "tstorms":
		  case "nt_tstorms":
			return "z";
	
		  case "clear":
		  case "sunny":
			return "v";
	
		  case "cloudy":
			return "`";
	
		  case "flurries":
		  case "nt_flurries":
			return "]";
	
		  case "fog":
		  case "hazy":
		  case "nt_fog":
		  case "nt_hazy":
			return "g";
	
		  case "mostlycloudy":
		  case "partlysunny":
		  case "partlycloudy":
		  case "mostlysunny":
			return "1";
	
		  case "sleet":
		  case "nt_sleet":
			return "3";
	
		  case "rain":
		  case "nt_rain":
			return "6";
	
		  case "snow":
		  case "nt_snow":
			return "o";
	
		  // Night Specific
	
		  case "nt_chanceflurries":
			return "a";
	
		  case "nt_chancerain":
			return "8";
	
		  case "nt_chancesleet":
			return "5";
	
		  case "nt_chancesnow":
			return "[";
	
		  case "nt_chancetstorms":
			return "c";
	
		  case "nt_clear":
		  case "nt_sunny":
			return "/";
	
		  case "nt_cloudy":
			return "2";
	
		  case "nt_mostlycloudy":
		  case "nt_partlysunny":
		  case "nt_partlycloudy":
		  case "nt_mostlysunny":
			return "2";
	
	
		  default:
			console.log("MISSING", code);
			_gaq.push(['_trackEvent', 'unknowweather', code]);
			return "T";
		}
	  }
};


 

// initialisation des comportements quand le DOM est pret
document.addEventListener('DOMContentLoaded', function() {
 

  // Liens du menu principal - Permet de changer la partie principale
  
  //Au clique sur Accueil
  $('#linkAccueil').click(function(){
    $('#containerConfig').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
	$('#containerControl').hide();
    $('#containerAccount').hide();
    $('#linkConfig').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#linkAccount').removeClass('active');
    $('#linkControl').removeClass('active');
    $('#containerAccueil').show();
  });
   
  //Au clique sur Controle
  $('#linkControl').click(function(){
    $('#containerConfig').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#containerAccount').hide();
    $('#linkConfig').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#linkAccount').removeClass('active');
    $('#containerControl').show();
    $('#linkControl').addClass('active');
  });
  
  //Au clique sur Motor
  $('#linkConfig').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#containerAccount').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#linkAccount').removeClass('active');
    $('#containerConfig').show();
    $('#linkConfig').addClass('active');
  });
  
  //Au clique sur la page d'essai
  $('#linkTryPage').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerConfig').hide();
	$('#containerAccueil').hide();
    $('#containerAccount').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkConfig').removeClass('active');
    $('#linkAccount').removeClass('active');
    $('#containerTryPage').show();
    $('#linkTryPage').addClass('active');
  });

  //sous menu admin - comportement de la barre de navigation
  $('#linkAdmin').click(function(){
    $('#containerConfig').hide();
	$('#containerControl').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#containerAccount').hide();
    $('#linkConfig').removeClass('active');
	$('#linkControl').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#linkAccount').removeClass('active');
    $('#containerAdmin').show();
    $('#linkAdmin').addClass('active');
  });
  
  //sous menu du compte
  $('#linkAccount').click(function(){
    $('#containerConfig').hide();
	$('#containerControl').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#containerAdmin').hide();
    $('#linkConfig').removeClass('active');
	$('#linkControl').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#linkAdmin').removeClass('active');
    $('#containerAccount').show();
    $('#linkAccount').addClass('active');
  });
  
  //comportement du sous menu admin - au clique sur entrée analogique
  $('#linkAnalogIn').click(function(){
	$('#containerAnalogOut').hide();
	$('#containerNumericIn').hide();
	$('#containerNumericOut').hide();
	$('#linkAnalogOut').removeClass('active');
	$('#linkNumericIn').removeClass('active');
	$('#linkNumericOut').removeClass('active');
	$('#containerAnalogIn').show();
	$('#linkAnalogIn').addClass('active');
	});
  
	//au clique sur sortie analogique
	$('#linkAnalogOut').click(function(){
	$('#containerAnalogIn').hide();
	$('#containerNumericIn').hide();
	$('#containerNumericOut').hide();
	$('#linkAnalogIn').removeClass('active');
	$('#linkNumericIn').removeClass('active');
	$('#linkNumericOut').removeClass('active');
	$('#containerAnalogOut').show();
	$('#linkAnalogOut').addClass('active');
	});
  
	//Au clique sur entrée numérique
	$('#linkNumericIn').click(function(){
	$('#containerAnalogIn').hide();
	$('#containerAnalogOut').hide();
	$('#containerNumericOut').hide();
	$('#linkAnalogIn').removeClass('active');
	$('#linkAnalogOut').removeClass('active');
	$('#linkNumericOut').removeClass('active');
	$('#containerNumericIn').show();
	$('#linkNumericIn').addClass('active');
	});
  
	//Au clique sur sorties numériques
	$('#linkNumericOut').click(function(){
	$('#containerAnalogIn').hide();
	$('#containerAnalogOut').hide();
	$('#containerNumericIn').hide();
	$('#linkAnalogIn').removeClass('active');
	$('#linkAnalogOut').removeClass('active');
	$('#linkNumericIn').removeClass('active');
	$('#containerNumericOut').show();
	$('#linkNumericOut').addClass('active');
	});
	
  console.log("Fin du chargement des comportements");
});


