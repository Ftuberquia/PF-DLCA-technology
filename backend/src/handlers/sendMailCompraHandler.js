// const nodemailer = require('nodemailer');
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

// const sendMailCompraHandler = async (req, res) => {

    

//     const accountTransport = {
//         "service": "gmail",
//         "auth": {
//             "type": "OAuth2",
//             "user": "dlcatechnologycompany@gmail.com",
//             "clientId": "IwclmsNjkZlmZfMCmi7OWEbOFu53jKDE.apps.googleusercontent.com",
//             "clientSecret": "8PLDNBCY9F5-Qf5pTHTEKasSAwwW54YJkBOde_LRUweqHBZhS9Cft5gqOs1DDlw_",
//             "refreshToken": "ya29.a0AfB_byANXmOPzhG5L0ac39kaGT6ISsOFDZ3n_rorP9vntqaakFjK7pLwtGSUmwA62A5tDK1r9BO9o5kvaQWTKlUxQ0D_8_T9Fbp9XIWUXNLSMlGpSThSAA4R9r3nE4uEWSNBkHaqPictqmmfw-RpMnA6OaPAwMmsZAaCgYKAbQSAQ8SFQGOcNnC8OMf7ePpBy5iKWr4w3rnhQ0169",
//             accessToken: accessToken, 
//         }
//     };

//     const mail_rover = async (callback) => {
//         const oauth2Client = new OAuth2(
//             accountTransport.auth.clientId,
//             accountTransport.auth.clientSecret,
//             "https://developers.google.com/oauthplayground"
//         );
//         oauth2Client.setCredentials({
//             refresh_token: accountTransport.auth.refreshToken
//         });
//         const accessToken = await oauth2Client.getAccessToken();
//         accountTransport.auth.accessToken = accessToken;
//         callback(nodemailer.createTransport(accountTransport));
//     };

//     mail_rover(async (emailTransporter) => {

//         const { destinatario, asunto, mensaje } = req.body;
        
//         const mailOptions = {
//             from: 'dlcatechnologycompany@gmail.com',
//             to: destinatario,//'orlibet@gmail.com', // Reemplaza esto con el destinatario real
//             subject: asunto,//'Envío desde nodemailer',
//             text: mensaje // 'Hola mundo!'
//         };

//         try {
//             await emailTransporter.sendMail(mailOptions);
//             console.log('Email enviado');
//             res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ error: 'Error al enviar el correo electrónico' });
//         }
//     });
// };

// module.exports = { sendMailCompraHandler };