import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../components/Filters/Filters";
import { addToCart } from "../../redux/actions/index";
import axios from "axios";
import style from './Productos.module.css'

function Productos() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [productsData, setProducts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadProducts()
  }, [page]);

  const loadProducts = async () =>{
    try {
      const response = await axios.get(`/products?page=${page}`)
      const data=await response.data;
      setProducts((prevProducts)=>[...prevProducts, ...data])
    } catch (error) {
      console.error('Error en el front',error);
    }
  }

  const handleScroll=(e)=>{
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1); // Incrementar el número de página cuando se llega al final del contenedor
    }
  }

  return (
    <div className={style.homeContainer}>
      <Filters />
      <div>
        <Cards products={productsData} scroll={(e)=>handleScroll(e)}/>
      </div>
    </div>
  );
}

export default Productos;

