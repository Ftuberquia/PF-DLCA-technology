const { UserProductReviews, Users, Products } = require("../../db")

const postReviews = async (userId, productId, comment, rating, userEmail) => {
    if (!rating || !comment || !userId || !userEmail) {
      throw Error('Todos los campos son obligatorios');
    }
  
    try {
      // Verificamos si el usuario existe en la tabla User
      const user = await Users.findByPk(userId);
  
      if (!user) {
        throw Error('El usuario no existe');
      }

      // Buscamos el producto
      const product = await Products.findByPk(productId);

      // Creamos la revisión asociándola al usuario
      const newReview = await UserProductReviews.create({
        userId:user.id,
        productId,
        comment,
        rating,
        userEmail
      });

      // Obtenemos todos los reviews asociados al producto
      const allReviews = await UserProductReviews.findAll({
        where: {
          productId,
        },
      });

    // Calculamos el nuevo rating promedio
      const ratingsSum = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const newRating = ratingsSum / allReviews.length;

    // Actualizamos el rating del producto
      await product.update({ rating: newRating });

      return newReview;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw Error('Ya hiciste la reseña de este producto!');
      } else {
        console.error('Error al insertar en la base de datos:', error);
      throw error; // Manejar errores adecuadamente en tu aplicación
     } 
  }
  };

module.exports = postReviews