const express = require('express'); // modulo principal express
const cookieParser = require('cookie-parser'); //middleware para analizar las cookies en las solicitudes entrantes.
const bodyParser = require('body-parser'); //middleware utilizado para analizar los cuerpos de las solicitudes HTTP entrantes.
const morgan = require('morgan'); //middleware de registro de solicitudes HTTP. Registra detalles sobre cada solicitud que llega al servidor.
const routes = require('./routes/index.js'); // import definicion de las rutas


require('./db.js'); 

const server = express(); // instancia express 

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //Establece la opción extended en true para permitir datos anidados en los cuerpos de las solicitudes y establece un límite de tamaño de 50 MB para los cuerpos de las solicitudes.
server.use(bodyParser.json({ limit: '50mb' })); //También se establece un límite de tamaño de 50 MB para los cuerpos de las solicitudes.
server.use(cookieParser()); //para analizar las cookies en las solicitudes entrantes.
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // . Permite las solicitudes desde el origen 'http://localhost:3000' o *
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

server.use('/', routes); //Configura las rutas de la API importadas desde el archivo index.js

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
}); // Si se produce un error en alguna parte del código anterior, este middleware capturará el error y enviará una respuesta con un estado y un mensaje de error.

module.exports = server;
