const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //El servidor es notificado del siguiente ticket
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    let estadoActual = {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    };

    client.emit('estadoActual', estadoActual);

    client.on('atenderTicket', (data, callback) => {

        if (!data.cajero) {
            return callback({
                ok: false,
                message: "El escritorio es necesario"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.cajero);

        callback(atenderTicket);

        //TODO: Actualizar / Notificar cambios en últimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});