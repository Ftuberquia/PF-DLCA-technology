const {Products, Tags} = require ("../../db")

const getPaginate = async (req, res) => {
  try {
    const limit = 10; //Numero de elementos por pagina
    const page = parseInt(req.query.page) || 1;
    console.log(req.query.page)
  
    const offset = (page - 1) * limit; // Calcula el desplazamiento

    const products = await Products.findAll({
      limit,
      offset, // esto evita que se vuelvan a enviar los productos de la pagina anterior
      include:{
          model:Tags,
          attributes:['name'],
          through:{attributes:[]}
      }
  });
    res.json(products);
    
  } catch (error) {
    console.error("Error al obtener Productos", error);
    res.status(500).send({error: error.message});
  }
};

module.exports =  getPaginate;
