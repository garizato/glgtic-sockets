var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdida de conexión con el servidor');
});

socket.on('estadoActual', function(estado) {
    console.log(`Estado Actual ${ estado.actual }`);
    label.text(estado.actual);
});

$('button').on('click', function() {
    //
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });
});