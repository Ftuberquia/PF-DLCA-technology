const getProductDetail = require('../controllers/getProductDetail')

// Handler que muestra el detail a partir de su id
const getDetailHandler = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {
            let producto = await getProductDetail(Number(id)); 
            if (producto) {
                res.status(200).json(producto);
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }

};

module.exports = { getDetailHandler };