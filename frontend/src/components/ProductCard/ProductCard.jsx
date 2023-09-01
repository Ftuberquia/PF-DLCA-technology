import React from "react";
import { Card, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ products }) => {
  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.cardMedia}
        image={products.imageSrc}
        title={products.name}
      />
      <CardContent className={styles.cardContent}>
        <h2>{products.name}</h2>
        <p>{products.description}</p>
        <p>Price: ${products.price}</p>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button variant="contained" color="primary">
          Agregar al carrito
        </Button>
        <Button variant="contained" color="secondary">
          Agregar a Favoritos
        </Button>
        <Link to={`/products/${products.id}`}>
          <Button variant="contained" color="default">
            Ver detalles
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;