require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { Sequelize } = require('sequelize'); // para interactuar con postgresSQL
const fs = require('fs'); //manipula sistemas de archivos
const path = require('path');


// Local Host:
const sequelize = new Sequelize(
 `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
 {
 		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 }
);

const basename = path.basename(__filename); // Obtiene el nombre base del archivo actual.

const modelDefiners = []; // Crea un arreglo para almacenar los definidores de modelos.

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			 file !== basename &&
			  file.slice(-3) === '.js'
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

//DESTRUCTURING DE MODEL Y CREACION DE RELACIONES:
const { Users, Products, Cart, Brand, Category, Tags, Subcategory, UserProductReviews, CartProduct, PurchasedProduct, Order, OrderProduct } = sequelize.models;
// Aca vendrian las relaciones

//Relacion usuario con carrito
Users.hasOne(Cart, {foreignKey: "userId"});
Cart.belongsTo(Users, {foreignKey: "userId"});

//Relacion carrito con productos mediante tabla intermedia
Cart.belongsToMany(Products, {
	through: CartProduct, // Usa el modelo CartProduct como tabla intermedia
	foreignKey: 'cartId',
	otherKey: 'productId',
	as: 'cartProducts',
  });
  
  Products.belongsToMany(Cart, {
	through: CartProduct, // Usa el modelo CartProduct como tabla intermedia
	foreignKey: 'productId',
	otherKey: 'cartId',
	as: 'productsinCart',
  });

// Relaciones con el modelo Order
Users.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

// Relación entre Order y PurchasedProduct
Order.hasMany(PurchasedProduct, { foreignKey: 'orderId', as: 'purchasedProducts' });
PurchasedProduct.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Relaciones con PurchasedProduct
Users.hasMany(PurchasedProduct, { foreignKey: 'userId' });
PurchasedProduct.belongsTo(Users, { foreignKey: 'userId' });

Products.hasMany(PurchasedProduct, { foreignKey: 'productId' });
PurchasedProduct.belongsTo(Products, { foreignKey: 'productId' });

// Relación muchos a muchos entre Order y Product usando OrderProduct como tabla intermedia
Order.belongsToMany(Products, {
	through: OrderProduct,
	foreignKey: 'orderId',
  });
  
  Products.belongsToMany(Order, {
	through: OrderProduct,
	foreignKey: 'productId',
  });


//creo una tabla intermedia para hacer los favoritos
Products.belongsToMany(Users, { through: 'favorites', as: 'users', foreignKey: 'productId' });
Users.belongsToMany(Products, { through: 'favorites', as: 'products', foreignKey: 'userId' });

// Relación de Products:
Products.belongsToMany(Tags, {through:"tags_products"});
Tags.belongsToMany(Products, {through:"tags_products"});

Category.hasMany(Products,{ foreignKey: 'categoryId', as: 'products'});		
Products.belongsTo(Category,{ foreignKey: 'categoryId', as: 'productCategory'});

Subcategory.hasMany(Products, {foreignKey:'subcategoryId', as: 'subcategory'});	        //el 'as:' crea la columna products-subcategory dentro de la primera tabla 
Products.belongsTo(Subcategory,{foreignKey: 'subcategoryId', as: 'productSubcategory'});

Category.hasMany(Subcategory, {foreignKey: "catSubId", as: 'subcat'})
Subcategory.belongsTo(Category, {foreignKey: 'catSubId', as: 'catSub'})

Brand.hasMany(Products, {foreignKey: 'brandsId', as: 'brands'});
Products.belongsTo(Brand,{foreignKey: 'brandsId', as: 'productBrands'});

// Relación de UserProductReviews:
Users.belongsToMany(Products, {
	through: UserProductReviews, // Usa el modelo UserProductReviews como tabla intermedia
	foreignKey: 'userId',
	otherKey: 'productId',
	as: 'reviewedProducts',
  });
  
  Products.belongsToMany(Users, {
	through: UserProductReviews, // Usa el modelo UserProductReviews como tabla intermedia
	foreignKey: 'productId',
	otherKey: 'userId',
	as: 'reviewsByUsers',
  });

  PurchasedProduct.hasMany(UserProductReviews, {
	foreignKey: 'productId',
	sourceKey: 'id',
	as: 'reviews',
  });

  // Relación de UserProductReviews con Products
UserProductReviews.belongsTo(Products, {
	foreignKey: 'productId',
	as: 'product',
  });
// Users.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
// Review.belongsTo(Users, { foreignKey: 'userId' });

// Products.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
// Review.belongsTo(Products, { foreignKey: 'productId' });

//Averiguar bien como seria esta relacion
// Products.belongsToMany(Orders, {through:"orders_products"});	//belongsToMany muchos a muchos, crea una tabla intermedia en donde se juntan las claves foraneas de A y B
// Orders.belongsToMany(Products, {through:"orders_products"});

// Products.belongsToMany(Cart, {through:"cart_products"});
// Cart.belongsToMany(Products, {through:"cart_products"});

module.exports = {
...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
