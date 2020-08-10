var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblCajero1 = $('#lblCajero1');
var lblCajero2 = $('#lblCajero2');
var lblCajero3 = $('#lblCajero3');
var lblCajero4 = $('#lblCajero4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblCajeros = [lblCajero1, lblCajero2, lblCajero3, lblCajero4];

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdida de conexión con el servidor');
});

// socket.on('estadoActual', function(data) {
//     console.log(data);

//     actualizaHTML(data.ultimos4);
// });


// socket.on('ultimos4', function(data) {
//     console.log(data.ultimos4);

//     var audio = new Audio('audio/new-ticket.mp3');
//     audio.play();

//     actualizaHTML(data.ultimos4);
// });

socket.on('estadoActual', async function(data) {
    // const audio = new Audio('audio/new-ticket.mp3');
    // await audio.play()
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', async function(data) {
    audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    await audio.play();
    audio.muted = false;
    actualizaHTML(data.ultimos4);
});




function actualizaHTML(ultimos4) {
    for (let index = 0; index < ultimos4.length; index++) {

        lblTickets[index].text('Ticket ' + ultimos4[index].numero);
        lblCajeros[index].text('Cajero ' + ultimos4[index].cajero);
    }
}