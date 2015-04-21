console.log("main.js ready");
alert('Hello world!');



// init
document.addEventListener('DOMContentLoaded', function() {
 

  // menu links - to display Led or Motor area
  $('#linkControl').click(function(){
    $('#containerMotor').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
    $('#linkMotor').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#containerControl').show();
    $('#linkControl').addClass('active');
  });
  $('#linkMotor').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerTryPage').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkTryPage').removeClass('active');
    $('#containerMotor').show();
    $('#linkMotor').addClass('active');
  });
  
  $('#linkTryPage').click(function(){
    $('#containerControl').hide();
	$('#containerAdmin').hide();
	$('#containerMotor').hide();
    $('#linkControl').removeClass('active');
	$('#linkAdmin').removeClass('active');
	$('#linkMotor').removeClass('active');
    $('#containerTryPage').show();
    $('#linkTryPage').addClass('active');
  });

  //sous menu admin - comportement de la barre de navigation
  $('#linkAdmin').click(function(){
    $('#containerMotor').hide();
	$('#containerControl').hide();
	$('#containerTryPage').hide();
    $('#linkMotor').removeClass('active');
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
  
  
  // led button
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

  // motor button
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

  // list all avaliable serial ports in the serialports button
  // user choose the port where Arduino board is connected
  var html = '';
  serialPort.list(function (err, ports) {

    ports.forEach(function(p) {
      var portName = p.comName.toString();
      html += '<li id="port'+portName+'"><a href="#">'+portName+'</a></li>';
      // when user select the port
      $('#serialPorts').on('click', '#port'+portName, p, function(data){

        $('#labelPort').removeClass('btn-primary').addClass('btn-default');
        $('#labelPort').html('<i class="fa fa-circle-o-notch fa-spin"></i>');

        // create the board connected to the port selected
        board = new five.Board({port: portName});

        // when board is ready
        board.on('ready', function() {
          // create Led component connected to the pin 13
          led = new five.Led({
            pin: 13
          });
          // create Motor component connected to the pin 5
          motor = new five.Motor({
            pin: 5
          });
          // and inject Led and Motor in the Repl of the board
          board.repl.inject({
            led: led,
            motor: motor
          });

          // show serial port name
          $('#labelPort').text(portName);
          $('#labelPort').removeClass('btn-default').addClass('btn-primary');
        });

        // when serial port error
        board.on('error', function(err){
          // show error message
          $('#labelPort').removeClass('btn-primary btn-default').addClass('btn-danger');
          $('#labelPort').text('Error!');
          // remove error message and return to normal state
          setTimout(function(){
            $('#labelPort').removeClass('btn-danger').addClass('btn-default');
            $('#labelPort').text('Ports');
          }, 5000);
        });

      });

    });

    // show serial ports names
    $('#serialPorts').html(html);

  });

});
