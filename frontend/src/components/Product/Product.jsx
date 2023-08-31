import React from 'react';

function Products(props) {
  const { name, description, price, image } = props.product;

  const handleAddToCart = () => {
    // Agregar el producto al carrito
  };

  const handleBuyNow = () => {
    // Comprar el producto ahora
  };

  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Precio: ${price}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      <button onClick={handleBuyNow}>Comprar ahora</button>
      <h4>Comentarios</h4>
      <form>
        <label htmlFor="comment">Comentario:</label>
        <textarea id="comment" name="comment" />
        <button type="submit">Enviar comentario</button>
      </form>
      <div className="rating">
        <span className="star">&#9733;</span>
        <span className="star">&#9733;</span>
        <span className="star">&#9733;</span>
        <span className="star">&#9734;</span>
        <span className="star">&#9734;</span>
        <p>Calificación promedio: 3 estrellas</p>
      </div>
    </div>
  );
}

export default Products;