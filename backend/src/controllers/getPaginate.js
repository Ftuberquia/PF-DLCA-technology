const Products = require("../models/products");
const { Products } = require("../db");
const { Op } = require("sequelize");

const getPaginate = async (req, res) => {
  const page = parseInt(req, query.page);
  const itemsPerPage = 9; //Numero de elementos por pagina

  const offset = (page - 1) * itemsPerPage;
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2",
      [offset, itemsPerPage]
    );

    const Productos = result.rows;
    res.json(Productos);
  } catch (error) {
    console.error("Error al obtener Productos", error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = { getPaginate };
