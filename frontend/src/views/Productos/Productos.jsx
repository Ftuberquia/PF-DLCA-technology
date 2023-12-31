import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import { addToCart, resetName } from "../../redux/actions/index";
import axios from "axios";
import style from './Productos.module.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading/Loading";

function Productos() {

  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.productsName)
  const [productsData, setProductsData] = useState([])
  const [productsDataName, setProductsDataName] =useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsData([])
    loadProducts()
  }, [page, filteredProducts]);

  async function handlePrevPage(e){
    if(page===1||page<1){
      setPage(1)
    }else{
      setPage(page-1)
      setIsLastPage(false)
    }
  }

  const handleNextPage = async (e)=>{
    let url=`/products?page=${page+1}`

      if(filteredProducts.name){
        url += `&name=${filteredProducts.name}`
      }

      if (filteredProducts.brand) {
        url += `&brand=${filteredProducts.brand}`;
      }

      // Verificar y asignar el valor de subcategory
      if (filteredProducts.subcategory) {
        url += `&subcategory=${filteredProducts.subcategory}`;
      }
  
      // Verificar y asignar el valor de category
      if (filteredProducts.category) {
        url += `&category=${filteredProducts.category}`;
      }
  
      // Verificar y asignar el valor de order
      if (filteredProducts.order) {
        url += `&order=${filteredProducts.order}`;
      }
  
      // Verificar y asignar el valor de priceOrder
      if (filteredProducts.priceOrder) {
        url += `&priceOrder=${filteredProducts.priceOrder}`;
      }
      
      const response = await axios.get(url);
      const data = await response.data;
    
    if(data.length!==0){
      setPage(page+1)
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }

  }

  const loadProducts = async () => {
    try {
      let url=`/products?page=${page}`
      
      if(filteredProducts.length!==0){
        if(filteredProducts.name){
          url += `&name=${filteredProducts.name}`
        }

        if (filteredProducts.brand) {
          url += `&brand=${filteredProducts.brand}`;
        }

        // Verificar y asignar el valor de subcategory
        if (filteredProducts.subcategory) {
          url += `&subcategory=${filteredProducts.subcategory}`;
        }
    
        // Verificar y asignar el valor de category
        if (filteredProducts.category) {
          url += `&category=${filteredProducts.category}`;
        }
    
        // Verificar y asignar el valor de order
        if (filteredProducts.order) {
          url += `&order=${filteredProducts.order}`;
        }
    
        // Verificar y asignar el valor de priceOrder
        if (filteredProducts.priceOrder) {
          url += `&priceOrder=${filteredProducts.priceOrder}`;
        }
        
        const response = await axios.get(url);
        const data = await response.data;
        setProductsData([...data]);

      }else{
        const response = await axios.get(url);
        const data = await response.data;
        setProductsData(() => [...data]);
      }
    } catch (error) {
      console.error("Error en el front", error);
    }
  };

  const updateFilters = (fieldName, selectedValue) => {
    setFilteredProducts((prevFilters) => ({
      ...prevFilters,
      [fieldName]: selectedValue,
    }));
    setPage(1)
    loadProducts();
  };

  const handleResetFilter= async (e) =>{
    setFilteredProducts([])
    setPage(1)
    loadProducts()
  }

  const updateSearch = (name) => {
    setFilteredProducts(() => ({
      name: name,
    }));
    setPage(1)
    loadProducts();
  }

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.homeContainer}>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
      <div>
      <Filters updateFilters={updateFilters} handleResetFilter={(event)=>handleResetFilter(event)}/>
      <div className={style.search}>
        <SearchBar updateSearch={updateSearch}/>
      </div>
      <div>
      <Cards products={filteredProducts.length > 0 ? filteredProducts:productsData} page={page} isLastPage={isLastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
      </div>
      </div>
     )}
  </div>
  );
}

export default Productos;

