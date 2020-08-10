var socket = io();

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdida de conexión con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('cajero')) {
    window.location = 'index.html';
    throw new Error('El Cajero es necesario');
}

var cajero = searchParams.get('cajero');

console.log(cajero);
$('h1').text('Cajero ' + cajero);

$('button').on('click', function() {
    socket.emit('atenderTicket', { cajero: cajero }, function(response) {
        console.log(response);

        if (response === "No hay Tickets") {
            label.text(response);
            return;
        }

        label.text('Ticket ' + response.numero);

    });
});