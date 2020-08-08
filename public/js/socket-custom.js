        let socket = io();

        socket.on('connect', function() {
            console.log('conectado al servidor');
        });

        socket.on('disconnect', function() {
            console.log('perdida conexion con servidor');
        });

        //Enviar Información al servidor
        socket.emit('enviarMensaje', {
            usuario: 'Gerardo',
            mensaje: 'Hola Server'
        }, function(resp) {
            console.log('respuesta server:', resp);
        });

        //Escuchar Información del servidor
        socket.on('enviarMensaje', function(mensaje) {
            console.log('Servidor:', mensaje);
        });