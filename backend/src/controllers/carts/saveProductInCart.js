const { CartProduct, Cart, Products } = require("../../db");

const postProduct = async (
  cartId,
  productId,
  quantity_prod
) => {
  if (!quantity_prod) {
    throw Error("El campo es obligatorio");
  }

  try {
  // Buscar el registro en la tabla CartProduct con los valores de cartId y productId
  const cartProduct = await CartProduct.findOne({
    where: { CartId: cartId, ProductId: productId },
  });

    if (!cartProduct) {
      throw Error("El usuario no existe");
    }

    // Creamos la revisión asociándola al usuario
    const newReview = await UserProductReviews.create({
      userId: user.id,
      productId,
      comment,
      rating,
    });

    // Obtenemos todos los reviews asociados al producto
    const allReviews = await UserProductReviews.findAll({
      where: {
        productId,
      },
    });

    // Calculamos el nuevo rating promedio
    const ratingsSum = allReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const newRating = ratingsSum / allReviews.length;

    // Actualizamos el rating del producto
    await product.update({ rating: newRating });

    return newReview;
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error; // Manejar errores adecuadamente en tu aplicación
  }
};

// module.exports = postReviews;
