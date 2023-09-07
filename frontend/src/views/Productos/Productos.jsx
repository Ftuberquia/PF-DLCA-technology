import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";
import Filters from "../../components/Filters/Filters";
import { addToCart } from "../../redux/actions/index";

function Productos() {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h1>Estos son los productos:</h1>
      <Filters />
      <Cards products={productsData} 
          addToCart={handleAddToCart}
          />
    </div>
  );
}

export default Productos;

