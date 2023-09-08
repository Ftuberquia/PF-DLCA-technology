const { UserProductReviews, Users } = require("../../db")

const postReviews = async (productId, comment, rating, userId) => {
    if (!rating || !comment || !userId) {
      throw Error('Todos los campos son obligatorios');
    }
  
    try {
      // Verificamos si el usuario existe en la tabla User
      const user = await Users.findByPk(userId);
  
      if (!user) {
        throw Error('El usuario no existe');
      }
  
      // Creamos la revisión asociándola al usuario
      const newReview = await UserProductReviews.create({
        userId: user.id,
        productId,
        comment,
        rating,
      });
  
      return newReview;
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
      throw error; // Manejar errores adecuadamente en tu aplicación
    }
  };

module.exports = postReviews