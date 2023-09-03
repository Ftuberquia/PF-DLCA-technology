const nodemailer = require('nodemailer');



const postContact = async (nombre, email, mensaje) => {
  try {


    console.log('Correo electrónico enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico', error);
    throw error; 
  }
};

module.exports = postContact;

  