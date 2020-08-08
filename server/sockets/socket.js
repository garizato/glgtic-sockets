const { io } = require('../server');
io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'admin',
        mensaje: 'bienvenido a la aplicación'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'Todo salió ok'
        //     });
        // } else {
        //     callback({
        //         resp: 'todo salió mal'
        //     });
        // }
    });
});