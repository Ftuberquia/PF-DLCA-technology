import React from "react";

const Card = ({ title, image, price, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{description}</p>
    </div>
  );
};

export default Card;
