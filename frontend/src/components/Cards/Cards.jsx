import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";

const Cards = ({ products }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Carga los productos desde la Bd
    axios("/db")
      .then((response) => response.json())
      .then((data) => {
        // setProducts(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Cargando productos...</h1>
      </div>
    );
  }

  return (
      <div className="cards">
        {products.map((product) => (
          <Card key={product.id} title={product.title} image={product.image} price={product.price} description={product.description} />
        ))}
      </div>
    );
  };

export default Cards;