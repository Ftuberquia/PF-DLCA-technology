import React, { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/index";

function Productos() {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Estos son los productos:</h1>
      <Cards products={productsData} />
    </div>
  );
}

export default Productos;

