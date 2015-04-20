console.log("Acces aux comportements");
//alert('Cette fenetre doit finir par se transformer en login - surement changer le système d alerte');



// init
document.addEventListener('DOMContentLoaded', function() {
 

  // Liens du menu principal - Permet de changer la partie principale
  
   
   
  //Au clique sur Controle
  $('#linkControl').click(function(){
    $('#containerConfig').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#linkConfig').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#containerControl').show();
    $('#linkControl').addClass('active');
  });
  
  //Au clique sur Motor
  $('#linkConfig').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#containerConfig').show();
    $('#linkConfig').addClass('active');
  });
  
  //Au clique sur la page d'essai
  $('#linkTryPage').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerConfig').hide();
	$('#containerAccueil').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkConfig').removeClass('active');
    $('#containerTryPage').show();
    $('#linkTryPage').addClass('active');
  });

  //sous menu admin - comportement de la barre de navigation
  $('#linkAdmin').click(function(){
    $('#containerConfig').hide();
	$('#containerControl').hide();
	$('#containerTryPage').hide();
	$('#containerAccueil').hide();
    $('#linkConfig').removeClass('active');
	$('#linkControl').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#containerAdmin').show();
    $('#linkAdmin').addClass('active');
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
	
	
	// Comportement menu Control
	
	//Comportement du bouton cuisine
	$('#linkCuisine').click(function(){
	$('#containerSalon').hide();
	$('#containerChambre').hide();
	$('#containerSalleDB').hide();
	$('#containerCouloir').hide();
	$('#linkSalon').removeClass('active');
	$('#linkChambre').removeClass('active');
	$('#linkSalleDB').removeClass('active');
	$('#linkCouloir').removeClass('active');
	$('#containerCuisine').show();
	$('#linkCuisine').addClass('active');
	});
	//Comportement du bouton Salon
	$('#linkSalon').click(function(){
	$('#containerCuisine').hide();
	$('#containerChambre').hide();
	$('#containerSalleDB').hide();
	$('#containerCouloir').hide();
	$('#linkCuisine').removeClass('active');
	$('#linkChambre').removeClass('active');
	$('#linkSalleDB').removeClass('active');
	$('#linkCouloir').removeClass('active');
	$('#containerSalon').show();
	$('#linkSalon').addClass('active');
	});
	//Comportement du bouton Chambre
	$('#linkChambre').click(function(){
	$('#containerCuisine').hide();
	$('#containerSalon').hide();
	$('#containerSalleDB').hide();
	$('#containerCouloir').hide();
	$('#linkCuisine').removeClass('active');
	$('#linkSalon').removeClass('active');
	$('#linkSalleDB').removeClass('active');
	$('#linkCouloir').removeClass('active');
	$('#containerChambre').show();
	$('#linkChambre').addClass('active');
	});
	//Comportement du bouton Salle de bain
	$('#linkSalleDB').click(function(){
	$('#containerCuisine').hide();
	$('#containerChambre').hide();
	$('#containerSalon').hide();
	$('#containerCouloir').hide();
	$('#linkCuisine').removeClass('active');
	$('#linkChambre').removeClass('active');
	$('#linkSalon').removeClass('active');
	$('#linkCouloir').removeClass('active');
	$('#containerSalleDB').show();
	$('#linkSalleDB').addClass('active');
	});
	//Comportement du bouton Couloir
	$('#linkCouloir').click(function(){
	$('#containerCuisine').hide();
	$('#containerChambre').hide();
	$('#containerSalleDB').hide();
	$('#containerSalon').hide();
	$('#linkCuisine').removeClass('active');
	$('#linkChambre').removeClass('active');
	$('#linkSalleDB').removeClass('active');
	$('#linkSalon').removeClass('active');
	$('#containerCouloir').show();
	$('#linkCouloir').addClass('active');
	});
	
	
  console.log("Fin du chargement des comportements");
  
  
  // led button - pas au point, car utilise des proriétés propres a Johnny-five
  $('#btnToggleLed').click(function(){
    if(led.isOn){
      led.off();
      $('#led').removeClass('led-on');
      $(this).removeClass('btn-primary').text('Turn On');
    }
    else{
      led.on();
      $('#led').addClass('led-on');
      $(this).addClass('btn-primary').text('Turn Off');
    }
  });

  // motor button - idem - tenter de créer une fonction qui en appel a plusieurs endroit différents: sur le html pour le comportement visuel et sur le app.js pour le comportement phyisique avec johnny-five
  $('#btnToggleMotor').click(function(){
    if(motor.isOn){
      motor.stop();
      $('#motor').removeClass('fa-spin');
      $(this).removeClass('btn-primary').text('Turn On');
    }
    else{
      motor.start();
      $('#motor').addClass('fa-spin');
      $(this).addClass('btn-primary').text('Turn Off');
    }
  });

});