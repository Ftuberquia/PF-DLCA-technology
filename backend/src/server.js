const express = require('express'); // modulo principal express
const cookieParser = require('cookie-parser'); //middleware para analizar las cookies en las solicitudes entrantes.
const bodyParser = require('body-parser'); //middleware utilizado para analizar los cuerpos de las solicitudes HTTP entrantes.
const morgan = require('morgan'); //middleware de registro de solicitudes HTTP. Registra detalles sobre cada solicitud que llega al servidor.
const routes = require('./routes/index.js'); // import definicion de las rutas
const cors = require('cors'); // solicitudes front
const Stripe = require('stripe'); //info desde el front
// const { logout } = require('../../frontend/src/redux/actions/index.js');


require('./db.js'); 

const server = express(); // instancia express 
// Configurar el middleware CORS antes de definir rutas
server.use(cors());
// server.name = 'API';

// KEY secreta de Stripe 
const stripe = new Stripe("sk_test_51NnMQaEUVHui4qp0BDSWGwhNtmw1gJbJF4tue1zqpRo3l56iE83u0VImKkguK6J1qgqJakEW2NCnVtUffGOoHwQp00qsaUMPZy")

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //Establece la opción extended en true para permitir datos anidados en los cuerpos de las solicitudes y establece un límite de tamaño de 50 MB para los cuerpos de las solicitudes.
server.use(bodyParser.json({ limit: '50mb' })); //También se establece un límite de tamaño de 50 MB para los cuerpos de las solicitudes.
server.use(cookieParser()); //para analizar las cookies en las solicitudes entrantes.
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // . Permite las solicitudes desde el origen 'http://localhost:3000' o *
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

server.post('/api/checkout', async (req, res) => {
	try{
		const { id, amount, return_url } = req.body
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Producto de tegnologia", // descripcion desde la base de datos
			payment_method: id,
			confirm: true,
			return_url,
		});
		console.log(payment);
		res.send({message: 'Pago exitoso', payment});

	} catch (error) {
		console.log(error);
		// res.json({message: error.raw.message})
		return res.redirect("/cancel");
	}
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