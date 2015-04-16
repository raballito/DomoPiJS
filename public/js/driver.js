  console.log("Acces au Driver");
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

