
var socket = io.connect('http://localhost/');


console.log("Chargement de js/driver.js fini")

  //Fonction d'initialisation et de passage des éléments allumés. ------ EN COURS --------
  // Création de la liste des sorties (+entrée?!) + gestion des icones si activées.
  socket.on('alreadyOn', function(data){      
    //Partie gestion des tableaux des entrées/sorties - c.f météo sur page d'accueil
    //Récupération de la liste des équipements branchés et l'état des sorties fournis dans le "data"
    var listeEquipement = data.listeEquipement;
    var ioState = data.ioState;  
    //Fonction "annonyme" executé pour chacun des objet de "listeEquipement" 
    $(listeEquipement).each(function(key, value){
       //on crée un objet, contenant les valeurs contenues dans "value" que l'on attribue en fonction du template HTML dans newIndex.jade
       var listeObj = {
           "adress": value.adress,
           "place": value.place,
           "object": value.object,
           "protocol": value.protocol,
           "etat": ioState[key],
       };    
        //Génération de la liste
        var template = $('#ioTabTpl').html(),
            html = Mustache.to_html(template, listeObj);
        $('tbody.ioTab').append(html);
    });
    
    //Partie gestion des icones -- A retravailler 
    for (var i = 0; i < ioState.length; i++){
        var index = i + 1;
        //concerne les 2 premieres leds branchées, i.e a la pin de l'index 0 et 1 - A retravailler
        if (ioState[i] == 1){ //si état == 1
            if(i == 0 || i == 1){
                console.log("Lumiere Cuisine" + index + " deja allumee");
                $('#ledCuisine'+ index).addClass('led-on');
                $('#btnToggleLedCuisine'+index).text('Turn Off');
            }
        
            else if (i == 2){
                    console.log("Lumiere Salon" + index + " deja allumee");
                    $('#ledSalon').addClass('led-on');
                    $('#btnToggleLedSalon').text('Turn Off');
            }
            else if (i == 3){
                    console.log("Lumiere Chambre" + index + " deja allumee");
                    $('#ledChambre').addClass('led-on');
                    $('#btnToggleLedChambre').text('Turn Off');
            }
            else{
                    console.log("Un probleme est survenu à l'index: "+index+" avec IOState: "+ioState);
            };
            
        };
        
    };
  });

      
  // Fonction générique permettant de changer l'icone, et d'envoyer un evenement correspondant
  //A l'appui sur un bouton, on recupère son ID complet, et on l'assigne à une variable
  // ------- Fonctionnel si btn bien configuré------
  $("[id*='btnToggle']").click(function() {
      var idComplet = $(this).attr('id');
      var number = $(this).attr('value');
      var codeRoom = $(this).attr('room');
      var codeObject = $(this).attr('object');
      
      //On sépare les divers éléments de l'ID en fonction des majuscules
      var splitted = idComplet.split(/(?=[A-Z])/);
      //On assigne l'objet controlé par le bouton dans la variable objet
      var objet = splitted[2];
      //On assigne aussi son emplacement a une autre variable = ID de l'icone
      var objetEmplacement = splitted[2]+splitted[3];
      //On assigne aussi le mot Toggle devant objetEmplacement pour l'évenement à envoyer
      var instruction = 'toggle' + objetEmplacement
      //On assigne une classe utilisée dans le style.css pour la couleur
      var CssClass = objet.toLowerCase() + "-on";
      //Création de l'ID cible du bouton
      var idCible = "#" + objet.toLowerCase() + splitted[3];
      var parametre = objet.toLowerCase() + splitted[3];
      
      /*//On affiche la variable dans la console
      console.log(idComplet);
      console.log(splitted);
      console.log(idCible);
      */
      
      changeIcon(objet, splitted[3], idCible, CssClass);
      socket.emit("toggleEquipement", parametre);
      console.log("Envoie de l'instruction: toggle" + parametre);      
});

  //Fonction de changement d'icone - change l'icone si la cible possède la classe "objet-on"
  //Change le texte aussi, s'il est présent sous l'icone.
  // ------- Fonctionnel --------
  function changeIcon(objet, lieu, idCible, CssClass){
      var objetEmplacement = objet+lieu;
      if($(idCible).hasClass(CssClass)){
          $(idCible).removeClass(CssClass);
          $("#btnToggle"+objetEmplacement).text('Turn On');
          $("#chosen"+lieu).text('');
      }
      else{
         $(idCible).addClass(CssClass); 
         $("#btnToggle"+objetEmplacement).text('Turn Off');
         $("#chosen"+lieu).text('100%');
      }  
  }
  
  //Fonction d'enregistrement
  // ------- Fonctionnel --------
  $("[id='btnRegister']").click(function() {
      //récupérer l'identifiant et le mot de passe
      var user = $('#newUser').val();
      console.log(user);
      var pwd = $('#newPassword').val();
      console.log(pwd);
      //les mettre dans un tableau/objet
      var requeteInfo = [user, pwd];
      //envoyer l'instruction "register" avec les donnée de l'utilisiateur
      socket.emit('register', requeteInfo)
      console.log("Instruction 'register' envoyé avec le data suivant: " + requeteInfo)
  });
  
  //Fonction d'affichage des infos sur la page d'accueil - A mettre dans une fenetre modale?!
  // ------- Fonctionnel , mais a améliorer --------
  socket.on('newInfo', function(data){
      console.log("Une info vient d'arriver: " + data);
      $('#message').text(data);
  });
      
  //Fonction générique pour les sliders
  // ------- Fonctionnel si slider appelle la fonction avec les 2 bons parametres --------
  function updateSlider(slideAmount, lieu) {     
        //Recupère l'élément de text a changer et lui passe la variable "slideAmount" - doit possèder l'ID chosen + Lieu pour etre changé
        //Change l'échelle de [0,255] en [0,100] et arrondi les nombres.
        $('#chosen'+lieu).text(parseInt((slideAmount)/255*100, 10)+"%");
        //creation des parametres utiles a la fonction
        var objet = $('#slide'+lieu).attr('objet');     
        //Concaténage
        var parametre = [objet, lieu, slideAmount];
        console.log(parametre);       
        socket.emit("updateSlider", parametre)
};


  //Fonction générique réception des données des senseurs
  // ------- Fonctionnel, mais à retravailler pour supprimer les doublons dans l'affichage --------
  socket.on('sensor', function (data){
    var lieu = data.salle;
    var valeur = data.valeur;
    var type = data.type;
    var code;
    var textAffiche;
    var unite;
    if (type == "temperature"){
        if (lieu == "Cuisine"){
            code = 0;
        }
        else if (lieu == "Salon"){
            code = 1;
        }
        else {
            console.log("Probleme avec les variables de température")
        };
        //Changement d'unité en °C
        unite = " °C \r";
    }
    else if (type == "senseur"){
        if (lieu == "TEST"){
            code = 2;
        }
        else {
            console.log("Probleme avec les variables des senseurs");
        }
        //Changement d'unité pour des V
        unite = " V \r";
    };
    //On ajoute la valeur au tableau
    $("#inData"+code).append(valeur + unite);
    //On annime vers le haut
    $("#inData"+code).animate({scrollTop:$("#inData"+code)[0].scrollHeight - $("#inData"+code).height()},200);
    
});
