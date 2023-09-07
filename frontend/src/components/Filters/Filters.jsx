import './Filters.css';
import React, { useEffect,useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux'; //conecta react-redux
import {
    getAllProducts, 
    getBrands, 
    getCategories,
    getSubCategories,
    filterFront
     } from '../../redux/actions';
// import Loader from '../Loader/Loader.jsx';


export default function Filters () {
    // loader
    // const loader = useSelector(state => state.loader);

    const dispatch = useDispatch();
    const brands = useSelector(state => state.brands);
    const categories = useSelector(state => state.categories);
    const subcategories = useSelector(state => state.subcategories)

    const filterBrand = useRef(null)
    const filterCategory = useRef(null)
    const filterSubcategories = useRef(null)
    const orderPrice = useRef(null)
    const orderName = useRef(null)



useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubCategories());
}, [dispatch]);

const handlerFilterOrderCombined = (e) =>{
    e.preventDefault()
    const brand =  filterBrand.current.value
    const category = filterCategory.current.value
    const subcategory = filterSubcategories.current.value
    let order = orderName.current.value
    let price = orderPrice.current.value
    if(order !== "order" ){
        order = orderName.current.value
        orderPrice.current.value = "price" 
    }
    if(price !== "price"){
        price = orderPrice.current.value
        orderName.current.value = "order"
    }
    const params =  {
        brand,
        category,
        order,
        price,
        subcategory
    }

    dispatch(filterFront(params))
}

// reset: 

const handleReset = (event) => {
    event.preventDefault();
    dispatch(getAllProducts());
    orderName.current.value = 'order'
    orderPrice.current.value = "price"
    filterBrand.current.value = 'All'
    filterCategory.current.value = 'All'
    filterSubcategories.current.value = 'All'
    alert('Loading...');

}


return (
    <section id='container' className='section-filters'>
    
        <div className='filt-order-cont'>
            <div className='filters'>
                <select className='filter-butt' ref={orderName} onChange={(e) => handlerFilterOrderCombined(e)} defaultValue="order">
                    <option value="order" disabled>Orden alfabetico</option>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </select>
                <select className='filter-butt' ref={filterCategory} onChange={(e) => handlerFilterOrderCombined(e)}defaultValue="All">
                    <option value="All" >Categorias</option>
                    {categories.length > 0 && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                </select>
                <select className="filter-butt" ref={filterSubcategories} onChange={(e)=>handlerFilterOrderCombined(e)} defaultValue="All">
                    <option value="All">Subcategorias</option>
                    {subcategories.length > 0 && subcategories.map((subcategory, index)=> (
                        <option key={index} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
                <select className='filter-butt' ref={orderPrice} onChange={(e) => handlerFilterOrderCombined(e)} defaultValue="price">
                    <option value="price" disabled>Orden por precio</option>
                    <option value="min">Menor a mayor</option>
                    <option value="max">Mayor a menor</option>
                </select>
            </div>
            <div className='order'>
            <select className='order-butt' ref={filterBrand} onChange={(e) => handlerFilterOrderCombined(e)} defaultValue="All">
                <option value="All">Marcas</option>
                {brands.length > 0 && brands.map((brand, index) => (
                    <option key={index} value={brand.name}>{brand.name}</option>
                ))}
            </select>
            </div>
            <div className='reset'>
                <button type='submit' className='reset-button' onClick={(event) => handleReset(event)}>Reset</button>
            </div>
        </div>
            
    </section>
);
};

//  {/* <div className='products-grid'>
//                 {
//                     !loader ? <Loader/> : currentProducts.map((product) => {
//                         return (
//                             <Card
//                             id={product.id}
//                             name={product.name}
//                             price={product.price}
//                             img={product.imgUrl}
//                             key={pokemon.id}
//                             brands={product.brand}
//                             // Stock= {product.stock}
//                             />)
//                         })
//                     }
//         </div> */}