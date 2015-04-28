
var socket = io.connect('http://localhost/');

console.log("Chargement de js/driver.js fini")

//Fonction d'initialisation et de passage des éléments allumés

socket.on('ledCuisine1isOn', function(data){
     $('#ledCuisine1').addClass('led-on');
     $('#btnToggleLedCuisine1').text('Turn Off');
  });

      
  // Fonction générique permettant de changer l'icone, et d'envoyer un evenement correspondant
  //A l'appui sur un bouton, on recupère son ID complet, et on l'assigne à une variable
  $("[id*='btnToggle']").click(function() {
      var idComplet = $(this).attr('id');
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
      
      /*//On affiche la variable dans la console
      console.log(idComplet);
      console.log(splitted);
      console.log(idCible);
      */
      
      //Fonction de changement d'icone
      if($(idCible).hasClass(CssClass)){
          $(idCible).removeClass(CssClass);
          $(this).text('Turn On');
      }
      else{
         $(idCible).addClass(CssClass); 
         $(this).text('Turn Off');
      }  
      socket.emit(instruction);
      console.log("Envoie de l'instruction " + instruction);      
});
  