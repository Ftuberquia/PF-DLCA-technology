const postContact = require("../../controllers/contact/postContact");
const { isValidEmail } = require("../../utils/isValidEmail");

const contactHandler = async(req,res) => {

    try {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje){
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'El correo electrónico no es válido' });
        }

        await postContact(nombre, email, mensaje);

        res.status(200).json({ message: 'Mensaje enviado con exito!' })
    } catch (error) {

        console.error('Error en el formulario de contacto', error);
        res.status(400).json({ error: 'Hubo un error al procesar tu solicitud' })
    }
};

module.exports = contactHandler;