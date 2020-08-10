let fs = require('fs');

class Ticket {

    constructor(numero, cajero) {
        this.numero = numero;
        this.cajero = cajero;
    }

}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }


    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(cajero) {
        if (this.tickets.length === 0) {
            return 'No hay Tickets';
        }

        if (this.ultimos4 === undefined) { this.ultimos4 = []; }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Elimino el primer ticket

        let atenderTicket = new Ticket(numeroTicket, cajero); //creo el ticket que el cajero va a atender


        this.ultimos4.unshift(atenderTicket); //Agregar el ticket al inicio del arreglo ultimos4

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el último
        }

        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }
}

module.exports = {
    TicketControl
};